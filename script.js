document.addEventListener("DOMContentLoaded", () => {
  // 导航栏滚动效果
  const header = document.querySelector("header")
  const navSlide = () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")

    burger.addEventListener("click", () => {
      // 切换导航
      nav.classList.toggle("nav-active")

      // 动画链接
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })

      // 汉堡动画
      burger.classList.toggle("toggle")
    })
  }

  navSlide()

  // 滚动监听
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // 更新活动链接
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")

        // 如果在移动设备上，关闭菜单
        const nav = document.querySelector(".nav-links")
        const burger = document.querySelector(".burger")
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active")
          burger.classList.remove("toggle")
          document.querySelectorAll(".nav-links li").forEach((link) => {
            link.style.animation = ""
          })
        }
      }
    })
  })

  // 监听滚动位置以更新活动链接
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
})
