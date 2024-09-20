// components/CustomCodeBlockTool.ts
class CustomCodeBlockTool {
  static get toolbox() {
    return {
      title: "Code Block",
      icon: "C",
    };
  }

  render() {
    const wrapper = document.createElement("pre");
    const textarea = document.createElement("code");
    textarea.classList.add(
      "custom-code-block",
      "w-full",
      "p-2",
      "border",
      "rounded",
      "font-mono"
    );

    wrapper.appendChild(textarea);
    return wrapper;
  }

  save(blockContent: HTMLTextAreaElement) {
    return {
      code: blockContent.value,
    };
  }
}

export default CustomCodeBlockTool;
