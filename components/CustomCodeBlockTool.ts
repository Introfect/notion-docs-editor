class CustomCodeBlockTool {
  static get toolbox() {
    return {
      title: "Code Block",
      icon: "C",
    };
  }

  render() {
    const wrapper = document.createElement("textarea");
    const code = document.createElement("code");
    wrapper.classList.add(
      "w-full",
      "p-2",
      "rounded",
      "text-sm",
      "font-mono",
      "focus:outline-none",
      "text-black",
      "resize-none",
      "h-32"
    );
    wrapper.appendChild(code);
    return wrapper;
  }

  save(blockContent: HTMLTextAreaElement) {
    return {
      code: blockContent.value,
    };
  }
  static get sanitize() {
    return {
      code: true,
    };
  }
}

export default CustomCodeBlockTool;
