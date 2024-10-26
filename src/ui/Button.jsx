import styled, { css } from "styled-components";  

const sizes = {  
  small: css`  
    font-size: 1.2rem;  
    padding: 0.4rem 0.8rem;  
    text-transform: uppercase;  
    font-weight: 600;  
    text-align: center;  
  `,  
  medium: css`  
    font-size: 1.4rem;  
    padding: 1.2rem 1.6rem;  
    font-weight: 500;  
  `,  
  large: css`  
    font-size: 1.6rem;  
    padding: 1.2rem 2.4rem;  
    font-weight: 500;  
  `,  
};  

const variations = {  
  primary: css`  
    color: var(--color-brand-50);  
    background-color: var(--color-brand-600);  

    &:hover {  
      background-color: var(--color-brand-700);  
    }  
  `,  
  secondary: css`  
    color: var(--color-grey-600);  
    background: var(--color-grey-0);  
    border: 1px solid var(--color-grey-200);  

    &:hover {  
      background-color: var(--color-grey-50);  
    }  
  `,  
  danger: css`  
    color: var(--color-red-100);  
    background-color: var(--color-red-700);  

    &:hover {  
      background-color: var(--color-red-800);  
    }  
  `,  
};  

// Correct the prop names to singular  
const Button = styled.button`  
  font-size: 1.4rem;  
  font-weight: 500;  
  background-color: var(--color-brand-500);  
  padding: 1.2rem 1.6rem;  
  border: none;  
  border-radius: var(--border-radius-sm);  
  box-shadow: var(--shadow-sm);  
  cursor: pointer;  
  color: var(--color-brand-50);  
  margin: 20px;  

  ${(props) => variations[props.variant]}  // Change from props.variations to props.variant  
  ${(props) => sizes[props.size]}        // Change from props.sizes to props.size  
`;  

// Default props should also use the singular terminology  
Button.defaultProps = {  
  size: "small",    // Change from sizes to size  
  variant: "primary" // Change from variations to variant  
};  

export default Button;