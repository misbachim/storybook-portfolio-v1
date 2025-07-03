import { createSlice } from '@reduxjs/toolkit'
import dialogueScript from '../../rersources/DialogueScript.json'

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    value: {
      variables: dialogueScript.variables,
      currentNode: nextNode(dialogueScript.variables, dialogueScript.start)
    }
  },
  reducers: {
    makeChoice: (state, action) => {
      // This function will take in a choice object, then set the conditions in choice.set_conditions if they exist,
      // And call NextNode with the node_name of the choices redirect 
      if(action.payload.set_conditions) {
        setVariableSet(state, action.payload.set_conditions);
      }
      let redirect = getValidRedirect(state.value.variables, action.payload.redirects);
      state.value.currentNode = nextNode(state.value.variables, redirect.node_name);
    },
    response: (state, action) => {
      state.value.currentNode = nextNode(state.value.variables, action.payload.redirect.node_name);
    },
  }
})

function nextNode(variables, node_name) {
  // This function will take in the name of the node, then check the conditions of that nodes redirects (if there are any)
  // To find the correct redirect, then 
  const node = dialogueScript.nodes[node_name];
  if(!node) {
      console.log("Invalid node name");
      return;
  }
  let outputNode = {};
  outputNode.data = node.data;
  if(node.redirects) {
      outputNode.redirect = getValidRedirect(variables, node.redirects);
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
  return outputNode
}

function checkCondition(variables, condition) {
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

function checkConditionSet(variables, conditions) {
  for(let i = 0; i < conditions.length; i++) {
    if(!checkCondition(variables, conditions[i])) return false;
  }
  return true;
}

function getValidRedirect(variables, redirects) {
  for(let i = 0; i < redirects.length; i++) {
      if (redirects[i].conditions) {
          if(checkConditionSet(variables, redirects[i].conditions)) return redirects[i];
      } else {
          return redirects[i];
      }
  }
  console.log("No valid redirects found.")
}

function setVariable(state, setter) {
  let newValue = {}
  switch (setter.operator) {
      case '=':
          newValue = setter.value
          break;
      case '*=':
          newValue = state.value.variables[setter.variable] * setter.value
          break;
      case '/=':
          newValue = state.value.variables[setter.variable] / setter.value
          break;
      case '+=':
          newValue = state.value.variables[setter.variable] + setter.value
          break;
      case '-=':
          newValue = state.value.variables[setter.variable] - setter.value
          break;
      case 'toggle':
          newValue = !state.value.variables[setter.var]
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
  state.value.variables = {
    ...state.value.variables,
    [setter.variable]: newValue
  }
}

function setVariableSet(state, setters) {
    setters.forEach(setter => {
        setVariable(state, setter);
    })
}

// Action creators are generated for each case reducer function
export const { makeChoice, response } = storySlice.actions

export default storySlice.reducer