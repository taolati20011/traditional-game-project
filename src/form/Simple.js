import React from 'react';
import './style.css';
import { Container } from './Container';

const Simple = () => {
  const triggerText = 'Open form';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };
  return (
    <div className="Simple">
      <Container triggerText={triggerText} onSubmit={onSubmit} />
    </div>
  );
};

export default Simple;