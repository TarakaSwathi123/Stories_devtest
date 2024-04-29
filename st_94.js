moveToPreviousSlide() {
    const progress = Array.from(document.querySelectorAll(".progress"));
    const activeIndex = progress.findIndex((el) =>
      el.classList.contains("active")
    );

    // If already at the first slide of the first story group, return
    if (activeIndex === 0 && this.position === 0) return;

    // Move to the previous slide
    const previousIndex = activeIndex - 1;
    progress[activeIndex]?.classList.remove("active");
    progress[activeIndex]?.classList.add("passed");
    progress[previousIndex]?.classList.add("active");

    // Update slide details and content for the new active slide
    this.updateSlideDetails(previousIndex);

    // If at the first slide of the current story group, move to the last slide of the previous group
    if (activeIndex === 0) {
        this.position -= 1;
        const previousGroupSlides = this.config[this.position].slides;
        const lastSlideIndex = previousGroupSlides.length - 1;
        this.progress_bar = new ProgressBar(
            this.config[this.position].progress_bar
        );
        this.slides = previousGroupSlides;
        // Set the last slide of the previous group as active
        progress[lastSlideIndex]?.classList.add("active");
        // Update slide details and content for the last slide of the previous group
        this.updateSlideDetails(lastSlideIndex);
    }
}

moveToNextSlide() {
    const progress = Array.from(document.querySelectorAll(".progress"));
    const activeIndex = progress.findIndex((el) =>
      el.classList.contains("active")
    );

    // If already at the last slide of the last story group, return
    if (activeIndex === progress.length - 1 && this.position === this.config.length - 1) return;

    // Move to the next slide
    const nextIndex = activeIndex + 1;
    progress[activeIndex]?.classList.remove("active");
    progress[activeIndex]?.classList.add("passed");
    progress[nextIndex]?.classList.add("active");

    // Update slide details and content for the new active slide
    this.updateSlideDetails(nextIndex);

    // If at the last slide of the current story group, move to the first slide of the next group
    if (activeIndex === progress.length - 1) {
        this.position += 1;
        if (this.position < this.config.length) {
            const nextGroupSlides = this.config[this.position].slides;
            this.progress_bar = new ProgressBar(
                this.config[this.position].progress_bar
            );
            this.slides = nextGroupSlides;
            // Set the first slide of the next group as active
            progress[0]?.classList.add("active");
            // Update slide details and content for the first slide of the next group
            this.updateSlideDetails(0);
        } else {
            // Log event if it's the last slide of the last story group
            window?.Apxor?.logInternalEvent?.("story_slides_closed");
        }
    }
}
