

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@components/header';
import { useRouter } from 'next/router';

window.React = React;

test("Test Hello World", async()=>{
    render("Hello world")
    expect(screen.getByText('Hello world'))
})

