import React from "react";

import { render, cleanup, waitForElement, wait, fireEvent, queryByAltText, getByText, getByAltText, getAllByTestId, prettyDOM, getByPlaceholderText, queryByText, queryAllByAltText } from "@testing-library/react";


import axios from 'axios';
import Application from "components/Application";

afterEach(cleanup);

describe('Tests for Application component', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {

      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments));

    const appointment = getAllByTestId(container, "appointment")[0];
    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});
fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

fireEvent.click(getByText(appointment, "Save"));

expect(getByText(appointment, "Saving")).toBeInTheDocument();

await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);

expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  })
})
