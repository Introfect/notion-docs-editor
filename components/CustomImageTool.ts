class CustomImageTool {
  static get toolbox() {
    return {
      title: "Image",
      icon: "🖼",
    };
  }

  render() {
    const wrapper = document.createElement("div");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.classList.add(
      "custom-image-input",
      "w-full",
      "p-2",
      "border",
      "rounded"
    );

    const imgPreview = document.createElement("img");
    imgPreview.classList.add(
      "image-preview",
      "w-full",
      "mt-2",
      "border",
      "rounded"
    );

    input.addEventListener("change", (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imgPreview.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    });

    wrapper.appendChild(input);
    wrapper.appendChild(imgPreview);
    return wrapper;
  }

  save(blockContent: HTMLElement) {
    const img = blockContent.querySelector("img");
    return {
      url: img?.src,
    };
  }
}

export default CustomImageTool;
