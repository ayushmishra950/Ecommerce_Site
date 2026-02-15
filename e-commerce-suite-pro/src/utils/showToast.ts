type ToastType = "success" | "error" | "info"

export const showToast = (
  title: string,
  message: string,
  type: ToastType = "success"
): void => {
  const toast = document.createElement("div")

  toast.innerHTML = `
    <strong style="display:block; margin-bottom:4px;">${title}</strong>
    <span>${message}</span>
  `

  // Base styles
  toast.style.position = "fixed"
  toast.style.bottom = "20px"
  toast.style.right = "20px"
  toast.style.padding = "14px 18px"
  toast.style.borderRadius = "10px"
  toast.style.color = "#fff"
  toast.style.fontSize = "14px"
  toast.style.fontFamily = "sans-serif"
  toast.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)"
  toast.style.zIndex = "9999"

  // Start position (hidden right side)
  toast.style.transform = "translateX(120%)"
  toast.style.opacity = "0"
  toast.style.transition = "transform 0.4s ease, opacity 0.4s ease"

  // Type color
  if (type === "success") toast.style.backgroundColor = "#16a34a"
  if (type === "error") toast.style.backgroundColor = "#dc2626"
  if (type === "info") toast.style.backgroundColor = "#2563eb"

  document.body.appendChild(toast)

  // Slide In (Right → Left)
  setTimeout(() => {
    toast.style.transform = "translateX(0)"
    toast.style.opacity = "1"
  }, 50)

  // Stay for 3 seconds, then slide out
  setTimeout(() => {
    toast.style.transform = "translateX(120%)"
    toast.style.opacity = "0"

    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 400)
  }, 3000)
}
