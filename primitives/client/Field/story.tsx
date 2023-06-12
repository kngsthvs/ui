import { type Meta, type StoryObj } from "@storybook/react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { Field } from "./index";

const meta: Meta<typeof Field> = {
  component: Field,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Client/Field",
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    label: "Label",
    name: "input",
    placeholder: "Input",
  },
  render: (args) => (
    <Field {...args}>
      {args.label && <Field.Label>{args.label}</Field.Label>}

      <Field.Input />
    </Field>
  ),
};

export const Textarea: Story = {
  args: {
    label: "Label",
    name: "textarea",
    placeholder: "Textarea",
  },
  render: (args) => (
    <Field {...args}>
      {args.label && <Field.Label>{args.label}</Field.Label>}

      <Field.Input as="textarea" />
    </Field>
  ),
};

export const Numeric: Story = {
  args: {
    label: "Amount",
    name: "amount",
    placeholder: "100,000.00",
  },
  render: (args) => (
    <Field {...args}>
      {args.label && <Field.Label>{args.label}</Field.Label>}

      <Field.Input allowLeadingZeros as={NumericFormat} thousandSeparator="," />
    </Field>
  ),
};

export const Pattern: Story = {
  args: {
    label: "Phone",
    name: "phone",
    placeholder: "(000) 000-0000",
  },
  render: (args) => (
    <Field {...args}>
      {args.label && <Field.Label>{args.label}</Field.Label>}

      <Field.Input
        as={PatternFormat}
        format="(###) ###-####"
        max={10}
        min={10}
        type="tel"
        valueIsNumericString
      />
    </Field>
  ),
};
