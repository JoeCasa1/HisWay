describe("ContentOverlay", () => {
  let contentOverlay;

  beforeEach(() => {
    contentOverlay = new ContentOverlay();
  });

  afterEach(() => {
    contentOverlay = null;
  });

  it("should attach shadow root with 'open' mode", () => {
    expect(contentOverlay.shadowRoot).toBeDefined();
    expect(contentOverlay.shadowRoot.mode).toBe("open");
  });

  it("should append content overlay template to shadow root", () => {
    const template = contentOverlay.shadowRoot.querySelector("template");
    expect(template).not.toBeNull();
    expect(template.content).not.toBeNull();
  });

  it("should add event listeners to close the overlay", () => {
    const closeButton = contentOverlay.shadowRoot.querySelector(".close");
    const overlay = contentOverlay.shadowRoot.querySelector(".overlay");
    const modalContent = contentOverlay.shadowRoot.querySelector(".modal-content");

    expect(closeButton).toBeDefined();
    expect(overlay).toBeDefined();
    expect(modalContent).toBeDefined();

    closeButton.click();
    expect(contentOverlay.close).toHaveBeenCalled();

    overlay.click();
    expect(contentOverlay.close).toHaveBeenCalled();

    modalContent.click();
    expect(contentOverlay.close).not.toHaveBeenCalled();

    modalContent.dispatchEvent(new Event("scroll"));
    expect(contentOverlay.close).not.toHaveBeenCalled();
  });
});