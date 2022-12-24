import styled from 'styled-components'


export const StyledFormSimple = styled.div`

  margin: 0 auto;
  border: solid 1px var(--c-1);
  width: 40%;
  padding: 1em;
  margin-top: 2em;
  box-shadow: 2px 1px 10px #00000057;
  border-radius: 10px;

  .cont{
    /* background-color: green; */
    h2{
      margin: 1em 0;
    }

    .form-item{
      display: flex;
      flex-direction: column;

      label{
        color: var(--c-2);
      }

      input{
        padding: .3em 1em;
        margin-bottom: .5em;
        border: none;
        border-bottom: solid 1px black;
        font-size: 1.5rem;
      }

      input[type="color"]{
        padding: 0;
        width: 100%;
        height: 50px;
      }

    }
  }

  .formErr{
    background-color: red;
    color: white;
    padding: .3em;
    margin-bottom: 1em;
    transition: .7s;

    &:empty{
      background-color: green;
      z-index: -500;
      height: 0;
      padding: 0;
      /* position: absolute;
      opacity: 0; */
    }
  }

  .submitPost{
    padding: 1em 2em;
    background-color: var(--c-1);
    color: var(--c-txt-alt);
    font-weight: bold;
    border: none;
    border-radius: 5px;
    transition: .3s;

    &:hover{
      background-color: var(--c-2);
    }
  }
`