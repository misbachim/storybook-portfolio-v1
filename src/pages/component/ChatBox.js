import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { useStory } from '../../hooks/useStory';
import dialogueScript from '../../rersources/DialogueScript.json'
import Modal from './Modal';
import TypeWriter from './TypeWriter';
import useDynamicRefs from './../../hooks/useDynamicRefs';
import { makeChoice, response } from '../../features/story/storySlice';

export default function ChatBox() {
  const variables = useSelector(state => state.story.value.variables)
  const currentNode = useSelector(state => state.story.value.currentNode)
  const dispatch = useDispatch()


  // const { variables, currentNode, dispatch(makeChoice, response } = useStory(dialogueScript))
  const [isTyping, setIsTyping] = useState(true)
  
  const ModalInput = ({ keyHtmlFor, modalValue }) => {
    const [getRef, setRef] =  useDynamicRefs();

    const handleModalConfirm = () => {
      let payload = {
          ...modalValue.confirm,
          set_conditions: modalValue.confirm.set_conditions.map(set_condition => {
              if (set_condition.operator !== 'input') {
                return set_condition
              }
              return {
                variable: set_condition.variable,
                operator: 'input',
                value: getRef(set_condition.variable).current.value
              }
            })
          }
      dispatch(makeChoice(payload))
    }

    const handleModalCancel = () => {
      dispatch(makeChoice(modalValue.cancel))
    }

    const handleKeyDown= (e) => {
      if (e.key === 'Enter') {
        handleModalConfirm()
      }
    }

    return (
      <>
        {modalValue.inputs.map(input => {
          return <input key={input.variable} type="text" placeholder={input.placeholder} ref={setRef(input.variable)} required={true}  onKeyDown={handleKeyDown} />
        })}
        <div className="margin-top row flex-spaces child-borders ">
          <label className='paper-btn btn-small' htmlFor={keyHtmlFor} onClick={handleModalConfirm} >{modalValue.confirm.text}</label>
          <label className='paper-btn btn-small' htmlFor={keyHtmlFor} onClick={handleModalCancel} >{modalValue.cancel.text}</label>
        </div>
      </>
    )
  }

  const ModalShowcase = ({ keyHtmlFor, modalValue }) => {

    const handleModalGood= () => {
      dispatch(makeChoice(modalValue.good))
    }

    const handleModalBad = () => {
      dispatch(makeChoice(modalValue.bad))
    }

    return (
      <>
        <ShowcaseImageWrapper>
          {modalValue.pictures.map(picture => {
            return <ShowcaseImage key={picture} src={process.env.PUBLIC_URL + '/showcase' + picture}/>
          })}
        </ShowcaseImageWrapper>
        <div>
          <div className="margin-top row flex-spaces child-borders ">
            <label className='paper-btn btn-small' htmlFor={keyHtmlFor} onClick={handleModalGood} >{modalValue.good.text}</label>
            <label className="paper-btn btn-small" onClick={()=> window.open(modalValue.link, "_blank")}>Check it out</label>
            <label className='paper-btn btn-small' htmlFor={keyHtmlFor} onClick={handleModalBad} >{modalValue.bad.text}</label>
          </div>
        </div>
      </>
    )
  }

  const replaceText = (text) => {
    let newText = text
    let myRegexp = /\${([^}]*)}+/g
    let match = myRegexp.exec(text);
    while (match != null) {
      newText = newText.replace(match[0], variables[match[1]])
      match = myRegexp.exec(text);
    }
    return newText
  }

  const toggleTypingOff = () => {
    setIsTyping(false)
  }

  return (
    <Container>
      {
        (
          currentNode &&
          currentNode.data.portrait &&
          <CharacterImage className='background-secondary' src={process.env.PUBLIC_URL + '/gif/' + currentNode.data.portrait + '.gif'} alt={'character'}/>
        )
        ||
          <CharacterImage className='background-secondary' src={process.env.PUBLIC_URL + (isTyping ? '/gif/peepoTalk.gif' : '/gif/peepoNotTalk.gif')} alt={'character'}/>
      }
      <Card className='card background-muted' >
        <CardBody className='card-body'>
          {
            currentNode &&
            currentNode.data &&
            <TypeWriter toggleTypingOff={toggleTypingOff} content={replaceText(currentNode.data.text)} speed={30} />
          }
          {
            !isTyping && 
            currentNode &&
            <ResponseWrapper className="row flex-spaces child-borders ">
              {
                currentNode.modal_form &&
                <>
                  <label className="paper-btn" htmlFor="modal-form">{currentNode.modal_form.text}</label>
                  <Modal content={<ModalInput key='modal-form' keyHtmlFor='modal-form' modalValue={currentNode.modal_form}/>}/>
                </>
              }
              {
                currentNode.modal_showcase &&
                <>
                  <label className="paper-btn" htmlFor="modal-showcase">{currentNode.modal_showcase.text}</label>
                  <Modal content={<ModalShowcase key='modal-showcase' keyHtmlFor='modal-showcase' modalValue={currentNode.modal_showcase}/>}/>
                </>
              }
              {
                currentNode.choices &&
                currentNode.choices.map((choice, index) => {
                  return (
                    <Button key={index} onClick={() => {
                      setIsTyping(true)
                      dispatch(makeChoice(choice))
                    }}>
                      {choice.text}
                    </Button>
                  )
                })
              }
              {
                currentNode.data.response_text &&
                <Button onClick={() => {
                  setIsTyping(true)
                  dispatch(response(currentNode))
                }}>
                  {currentNode.data.response_text}
                </Button>
              }
            </ResponseWrapper>
          }
        </CardBody>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  left: 5%;
  right: 5%;
`

const Card = styled.div`
  height: 200px;
`

const CardBody = styled.div`
  
`

const CharacterImage = styled.img`
  height: 15vh;
  width: 15vh;
  object-fit: contain;
  object-position: bottom;
`

const Button = styled.button`

`

const ResponseWrapper = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
`

const ShowcaseImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2vh;
`

const ShowcaseImage = styled.img`
  max-width: 45vh;
`