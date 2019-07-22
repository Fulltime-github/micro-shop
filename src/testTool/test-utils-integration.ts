import {RenderModel} from "./render-model";

export class TestUtils {
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   * @returns {Promise<HTMLElement>}
   * @param renderModel:RenderModel
   */
  public static render(renderModel: RenderModel) {
    TestUtils._renderToDocument(renderModel);
    return TestUtils._waitForComponentToRender(renderModel.tag);
  }

  /**
   * Replaces document's body with provided element
   * including given attributes.
   * @param renderModel:RenderModel
   */
  public static _renderToDocument(renderModel: RenderModel) {
    const htmlAttributes = TestUtils._mapObjectToHTMLAttributes(renderModel.attributes);

    document.body.innerHTML += `<${renderModel.tag} ${htmlAttributes}></${renderModel.tag}>`;
  }

  /**
   * Converts an object to HTML string representation of attributes.
   *
   * For example: `{ foo: "bar", baz: "foo" }`
   * becomes `foo="bar" baz="foo"`
   *
   * @param {object} attributes
   * @returns {string}
   */
  public static _mapObjectToHTMLAttributes(attributes: any) {
    return Object.entries(attributes).reduce((previous, current) => {
      return previous + ` ${current[0]}="${current[1]}"`;
    }, "");
  }

  /**
   * Returns a promise which resolves as soon as
   * requested element becomes available.
   * @param {string} tag
   * @returns {Promise<HTMLElement>}
   */
  public static async _waitForComponentToRender(tag: any) {
    return new Promise<HTMLElement>((resolve) => {
      function requestComponent() {
        const element = document.querySelector(tag);
        if (element) {
          resolve(element);
        } else {
          window.requestAnimationFrame(requestComponent);
        }
      }
      requestComponent();
    });
  }
}