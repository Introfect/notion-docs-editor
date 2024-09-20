// components/CustomTextTool.ts
class CustomTextTool {
  static get toolbox() {
    return {
      title: "Text",
      icon: "T",
    };
  }

  render() {
    const input = document.createElement("textarea");
    input.placeholder = "Type something...";
    input.classList.add(
      "custom-text-tool-input",
      "w-full",
      "p-2",
      "rounded",
      "w-full",
      "resize-none",
      "appearance-none",
      "overflow-hidden",
      "bg-transparent",
      "text-sm",
      "focus:outline-none",
      "text-black"
    );
    return input;
  }

  save(blockContent: HTMLTextAreaElement) {
    return {
      text: blockContent.value,
    };
  }
}

export default CustomTextTool;
