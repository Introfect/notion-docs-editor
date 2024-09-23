import {
  API,
  type BlockAPI,
  BlockTool,
  BlockToolConstructable,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";

type RectType = {
  height: number;
  width: number;
};

class Rect implements RectType {
  height: number;
  width: number;
  constructor({ height, width }: { height: number; width: number }) {
    this.height = height;
    this.width = width;
  }
  calculateArea() {
    const area = this.height * this.width;
    return area;
  }
}
const newRectangle = new Rect({ height: 12, width: 12 });

class CustomTextTool implements BlockTool {
  api: API;
  static get toolbox() {
    return {
      title: "Text",
      icon: "T",
    };
  }

  constructor({ api }: BlockToolConstructorOptions) {
    this.api = api;
  }
  render() {
    const input = document.createElement("input");
    input.placeholder = "Type here to write here and press / for commands";
    input.classList.add(
      "h-min",
      "w-full",
      "p-2",
      "rounded",
      "resize-none",
      "appearance-none",
      "overflow-hidden",
      "bg-transparent",
      "text-xl",
      "focus:outline-none",
      "text-black"
    );

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (input.value.trim() === "") {
          const br = document.createElement("br");
          input.append(br);
        } else {
          console.log("wahd");
        }
      }

      if (event.key === "/") {
        event.preventDefault();
        this.openToolbar();
      }
    });

    return input;
  }

  save(blockContent: HTMLTextAreaElement) {
    return {
      text: blockContent.value,
    };
  }

  openToolbar() {
    this.api.toolbar.toggleToolbox();
    try {
    } catch (error) {
      console.log("Cannot open toolbar please try again");
    }
  }

  addSpacing() {}
}

export default CustomTextTool;
