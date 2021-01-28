import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import userEvent from "@testing-library/user-event"
import App from './App';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
  };
};
// screen.debug(null, 20000) : to see max html structure
describe("App", () => {
  it('should add upcoming movies and watched', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByRole("link", {name: "Upcoming Movies"}))
    expect(history.location.pathname).toEqual("/upcomingmovies")
    userEvent.click(screen.getByRole("button", {name: "Watch a new movie"}))
  
    userEvent.type (screen.getByRole("textbox", {name: "Title"}), "Majangstories Title")
    userEvent.type(screen.getByRole("textbox", {name: "Image"}), "https://i.pinimg.com/originals/cb/0f/22/cb0f229cdbbfd1b47da93d875dc6ca01.jpg")
    userEvent.type(screen.getByRole("spinbutton", {name: "Duration"}), "2")
    userEvent.type(screen.getByRole("textbox", {name: "Reasons"}), "Best Movie")
    userEvent.type(screen.getByRole("spinbutton", {name:"Watch Schedule"}), "16")
    userEvent.click(screen.getByRole("button", {name: "Submit"}))
  
    userEvent.click(screen.getAllByRole("button", {name: "Done"})[2])
  });
  
  it('should edit mymovie card', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByRole("link", {name: "My Movie"}))
    expect(history.location.pathname).toEqual("/mymovie")
    userEvent.click(screen.getAllByRole("img", {name: "eye"})[1])
    userEvent.click(screen.getByRole("button", {name: "Edit"}))
    
    userEvent.type(screen.getByRole("textbox", {name: "Title"}), "haloo paijo")
    userEvent.click(screen.getByRole("button", {name: "Edit Movie"}))
    userEvent.click(screen.getByRole("button", {name: "OK"}))
    screen.debug(null, 30000)
    
  }) 
  
})
