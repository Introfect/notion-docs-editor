// components/CustomTextTool.ts
class CustomHeaderTool {
  static get toolbox() {
    return {
      title: "Header",
      icon: "H",
    };
  }

  render() {
    const input = document.createElement("textarea");
    input.placeholder = "Header 2";

    input.classList.add(
      "custom-text-tool-input",
      "w-full",
      "p-2",
      "rounded",
      "resize-none",
      "appearance-none",
      "overflow-hidden",
      "bg-transparent",
      "text-3xl",
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

export default CustomHeaderTool;
