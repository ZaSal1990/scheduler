import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);
describe('test for Appointment component', () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});