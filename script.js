document.addEventListener("DOMContentLoaded", () => {
    const dynamicText = document.getElementById("dynamic-text")
    const topics = [
      "Computer Science",
      "Machine Learning",
      "Software Engineering",
      "Full Stack",
      "Computer Vision",
      "Data Science",
      "Algorithm Analysis",
      "Algorithm Design",
      "Deep Learning"
    ]
    let currentTopicIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let typingSpeed = 100
    const deletingSpeed = 50
    const pauseTime = 1500
  
    function typeText() {
      const currentTopic = topics[currentTopicIndex]
  
      if (isDeleting) {
        dynamicText.textContent = currentTopic.substring(0, currentCharIndex - 1)
        currentCharIndex--
        typingSpeed = deletingSpeed
      } else {
        dynamicText.textContent = currentTopic.substring(0, currentCharIndex + 1)
        currentCharIndex++
        typingSpeed = 100
      }
  
      if (!isDeleting && currentCharIndex === currentTopic.length) {
        isDeleting = true
        typingSpeed = pauseTime
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false
        currentTopicIndex = (currentTopicIndex + 1) % topics.length
      }
  
      setTimeout(typeText, typingSpeed)
    }
  
    setTimeout(typeText, 1000)
  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: "smooth",
          })
        }
      })
    })
  
    const revealElements = document.querySelectorAll(
      ".section, .education-item, .experience-item, .project-item, .skill-category",
    )
  
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < window.innerHeight - elementVisible) {
          revealElements[i].classList.add("active")
        }
      }
    }
  
    const style = document.createElement("style")
    style.textContent = `
        .section, .education-item, .experience-item, .project-item, .skill-category {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section.active, .education-item.active, .experience-item.active, .project-item.active, .skill-category.active {
          opacity: 1;
          transform: translateY(0);
        }
      `
    document.head.appendChild(style)
  
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll() // Check on initial load
  })
  
  