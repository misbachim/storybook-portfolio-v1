import { useState, useEffect } from "react";
import styled from "styled-components";

export default function TypeWriter({ toggleTypingOff, content = "", speed = 1000, wrapper = 'p' }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0)
    setDisplayedContent("")
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/

        if (index >= content.length - 2) {
          clearInterval(animKey);
          return index+1;
        }
        return index + 1;
      });
    }, speed);
  }, [content]);

  useEffect(() => {
    setDisplayedContent(
      (displayedContent) => displayedContent + content[index]
    );
    if (content.length - displayedContent.length === 1) {
      toggleTypingOff()
    }
  }, [index]);

  return (
    <Container>
      {wrapper === 'h2' ? 
            <H2>{displayedContent}</H2>
            : wrapper === 'div' ? 
              <Div>{displayedContent}</Div>
              : <P>{displayedContent}</P>
      }
    </Container>
  )
};

const Container = styled.div`

`

const H2 = styled.p`

`

const Div = styled.p`

`

const P = styled.p`

`