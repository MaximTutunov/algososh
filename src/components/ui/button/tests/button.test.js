import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

const buttonText = "кнопка с текстом";

describe("тестирование кнопки Button", () => {
  it("рендер кнопки Button  с текстом", () => {
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер кнопки Button без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер кнопки Button заблокированной disabled", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер кнопки Button с индикацией загрузки isLoader", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("вызов коллбека по клику на кнопку Button", () => {
    const fn = jest.fn();
    render(<Button text={buttonText} onClick={fn} />);
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
