import renderer from "react-test-renderer";
import { Circle } from "../circle";
import {ElementStates} from "../../../../types";

describe("тестирование компонента Circle", () => {
  it("рендер компонента Circle без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер компонента Circle с буквами", () => {
    const tree = renderer.create(<Circle letter="abc" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер компонента Circle с head", () => {
    const tree = renderer.create(<Circle head={"Head"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер компонента Circle с React-component in head", () => {
    const tree = renderer
      .create(<Circle head={<div>ReactElement</div>} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("рендер компонента Circle с tail", () => {
    const tree = renderer.create(<Circle tail={"Tail"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("рендер компонента Circle с React-component in tail", () => {
    const tree = renderer
      .create(<Circle tail={<div>ReactElement</div>} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер компонента Circle с индексом", () => {
    const tree = renderer.create(<Circle index="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("рендер компонента Circle isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("рендер компонента Circle с ElementStates.Default", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("рендер компонента Circle с ElementStates.Changing", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("рендер компонента Circle с ElementStates.Modified", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
