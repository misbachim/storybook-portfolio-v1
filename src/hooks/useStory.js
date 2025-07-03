
import { useState } from 'react';
import { useLocalStorage } from './useStorage';
import { useEffect } from 'react';

export function useStory(storyData) {
  const [story, setStory] = useState(storyData)
  const [variables, setVariables] = useState(storyData.variables)
  const [currentNode, setCurrentNode] = useState(null)
  const [variablesStorage, setVariablesStorage, removeVariablesStorage] = useLocalStorage("storyVariables", variables)

  useEffect(() => {
    startStory()
    setVariables({...variables, ...variablesStorage})
  }, [])

  useEffect(() => {
    setVariablesStorage(variables)
  }, [variables])
  

  function nextNode(node_name) {
    // This function will take in the name of the node, then check the conditions of that nodes redirects (if there are any)
    // To find the correct redirect, then 
    const node = story.nodes[node_name];
    if(!node) {
        console.log("Invalid node name");
        return;
    }
    let outputNode = {};
    outputNode.data = node.data;
    if(node.redirects) {
        outputNode.redirect = getValidRedirect(node.redirects);
    }
    if(node.choices) {
        outputNode.choices = node.choices;
    }
    if(node.modal_form) {
        outputNode.modal_form = node.modal_form;
    }
    if(node.modal_showcase) {
        outputNode.modal_showcase = node.modal_showcase;
    }
    setCurrentNode(outputNode)
  }

  function makeChoice(choice) {
    // This function will take in a choice object, then set the conditions in choice.set_conditions if they exist,
    // And call NextNode with the node_name of the choices redirect 
    if(choice.set_conditions) {
      setVariableSet(choice.set_conditions);
    }
    let redirect = getValidRedirect(choice.redirects);
    nextNode(redirect.node_name);
  }

  function response(node) {
    nextNode(node.redirect.node_name);
  }

  function startStory() {
    // This function will call next node with the starting node
    nextNode(story.start);
  }

  function checkCondition(condition) {
    const value = variables[condition.variable];
    switch(condition.operator) {
        case '=': return value === condition.value;
        case '!=': return value !== condition.value;
        case '<': return value < condition.value;
        case '>': return value > condition.value;
        case '<=': return value <= condition.value;
        case '>=': return value >= condition.value;
        default: console.log('Invalid operator');
    }
  }

  function checkConditionSet(conditions) {
    for(let i = 0; i < conditions.length; i++) {
      if(!checkCondition(conditions[i])) return false;
    }
    return true;
  }

  function getValidRedirect(redirects) {
    for(let i = 0; i < redirects.length; i++) {
        if (redirects[i].conditions) {
            if(checkConditionSet(redirects[i].conditions)) return redirects[i];
        } else {
            return redirects[i];
        }
    }
    console.log("No valid redirects found.")
  }

  function setVariable(setter) {
    let newValue = {}
    switch (setter.operator) {
        case '=':
            newValue = setter.value
            break;
        case '*=':
            newValue = variables[setter.variable] * setter.value
            break;
        case '/=':
            newValue = variables[setter.variable] / setter.value
            break;
        case '+=':
            newValue = variables[setter.variable] + setter.value
            break;
        case '-=':
            newValue = variables[setter.variable] - setter.value
            break;
        case 'toggle':
            newValue = !variables[setter.var]
            break;
        case 'random':
            newValue = Math.floor(Math.random() * setter.value)
            break;
        case 'input':
            newValue = setter.value
            break;
        default:
            console.log('Invalid operator');
    }
    setVariables({
      ...variables,
      [setter.variable]: newValue
    })
  }

  function setVariableSet(setters) {
      setters.forEach(setter => {
          setVariable(setter);
      })
  }

  return {
    variables,
    currentNode,
    setStory,
    makeChoice,
    response,
  }
}
