import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

//--------- Testing passing of props -----------//


  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers}/>
    )
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones"/>
    )
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

//--------- Testing onSave & onChange -----------//

it("can successfully save after trying to submit an empty student name", () => {
  /* 1. Create the mock onSave function */
  const onSave = jest.fn();  

  /* 2. Render the Form with interviewers, student name and the onSave mock function passed as an onSave prop */
  const { getByText, getByPlaceholderText, queryByText } = render(
    <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
  );

    /* 3. Click the save button, fire event*/
  fireEvent.click(getByText("Save"));
 
  /* 4. Verify */
  expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();

  /* 5. Fire next event (capturing on-change feature on text input) */
  fireEvent.change(getByPlaceholderText("Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  /* 6. Fire click event after on change */
  fireEvent.click(getByText("Save"));

  /* 7. Verify */
  expect(queryByText(/student name cannot be blank/i)).toBeNull();
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
});

//--------- Testing onCancel -----------//

it("calls onCancel and resets the input field", () => {
  const onCancel = jest.fn();
  const { getByText, getByPlaceholderText, queryByText } = render(
    <Form
      interviewers={interviewers}
      student="Lydia Mill-Jones"
      onSave={jest.fn()}
      onCancel={onCancel}
    />
  );

  fireEvent.click(getByText("Save"));

  fireEvent.change(getByPlaceholderText("Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByText("Cancel"));

  expect(queryByText(/student name cannot be blank/i)).toBeNull();

  expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

  expect(onCancel).toHaveBeenCalledTimes(1);
  });

});