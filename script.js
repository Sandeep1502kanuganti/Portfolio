import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeHPBeLRIvIXpmT0nWuVMLKfZF52WhHYo",
  authDomain: "portfoliobuilder-786dc.firebaseapp.com",
  projectId: "portfoliobuilder-786dc",
  storageBucket: "portfoliobuilder-786dc.appspot.com",
  messagingSenderId: "873248414028",
  appId: "1:873248414028:web:91c534becf635a659057e9",
  measurementId: "G-15HGMH5L0N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add animation helper
function addAnimation(element, animationClass) {
  element.classList.add(animationClass);
  setTimeout(() => element.classList.remove(animationClass), 500);
}

// Enhanced addSkill function with animation
function addSkill() {
  const skillInput = document.getElementById("new-skill");
  const skill = skillInput.value.trim();
  if (skill === "") {
    skillInput.style.borderColor = "#ef4444";
    setTimeout(() => skillInput.style.borderColor = "#e2e8f0", 2000);
    return;
  }

  const li = document.createElement("li");
  li.textContent = skill;
  li.contentEditable = "true";
  li.onclick = () => {
    if (confirm("Are you sure you want to remove this skill?")) {
      li.style.transform = "scale(0)";
      li.style.opacity = "0";
      setTimeout(() => li.remove(), 300);
    }
  };
  
  // Add entrance animation
  li.style.transform = "scale(0)";
  li.style.opacity = "0";
  document.getElementById("skills-list").appendChild(li);
  
  setTimeout(() => {
    li.style.transform = "scale(1)";
    li.style.opacity = "1";
  }, 100);
  
  skillInput.value = "";
  skillInput.style.borderColor = "#10b981";
  setTimeout(() => skillInput.style.borderColor = "#e2e8f0", 1000);
}

// Enhanced addProject function with better template
function addProject() {
  const container = document.getElementById("projects");

  const div = document.createElement("div");
  div.className = "project";
  div.innerHTML = `
    <h3 contenteditable="true">New Project</h3>
    <p contenteditable="true">Describe your project here. What technologies did you use? What problems did it solve? What was your role?</p>
    <button onclick="removeProject(this)" title="Remove Project">
      <i class="fas fa-trash"></i>
    </button>
  `;
  
  // Add entrance animation
  div.style.transform = "translateY(20px)";
  div.style.opacity = "0";
  container.appendChild(div);
  
  setTimeout(() => {
    div.style.transform = "translateY(0)";
    div.style.opacity = "1";
  }, 100);
}

// Enhanced remove project function
function removeProject(button) {
  if (confirm("Are you sure you want to remove this project?")) {
    const project = button.parentElement;
    project.style.transform = "translateY(-20px)";
    project.style.opacity = "0";
    setTimeout(() => project.remove(), 300);
  }
}

// Make removeProject globally available
window.removeProject = removeProject;
// Modal Management Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

// Education Functions
function addEducation() {
  openModal('educationModal');
}

function saveEducation() {
  const degree = document.getElementById('edu-degree').value.trim();
  const institution = document.getElementById('edu-institution').value.trim();
  const year = document.getElementById('edu-year').value.trim();
  const grade = document.getElementById('edu-grade').value.trim();
  
  if (!degree || !institution || !year) {
    alert('Please fill in all required fields');
    return;
  }
  
  const educationList = document.getElementById('education-list');
  const div = document.createElement('div');
  div.className = 'education-item';
  div.innerHTML = `
    <h4 contenteditable="true">${degree}</h4>
    <p contenteditable="true"><strong>${institution}</strong> | ${year}</p>
    ${grade ? `<p contenteditable="true">Grade: ${grade}</p>` : ''}
    <button onclick="removeEducation(this)" class="remove-btn" title="Remove Education">
      <i class="fas fa-trash"></i>
    </button>
  `;
  
  div.style.transform = "translateY(20px)";
  div.style.opacity = "0";
  educationList.appendChild(div);
  
  setTimeout(() => {
    div.style.transform = "translateY(0)";
    div.style.opacity = "1";
  }, 100);
  
  // Clear form and close modal
  document.getElementById('edu-degree').value = '';
  document.getElementById('edu-institution').value = '';
  document.getElementById('edu-year').value = '';
  document.getElementById('edu-grade').value = '';
  closeModal('educationModal');
}

function removeEducation(button) {
  if (confirm("Are you sure you want to remove this education entry?")) {
    const item = button.parentElement;
    item.style.transform = "translateY(-20px)";
    item.style.opacity = "0";
    setTimeout(() => item.remove(), 300);
  }
}

// Certification Functions
function addCertification() {
  openModal('certificationModal');
}

function saveCertification() {
  const name = document.getElementById('cert-name').value.trim();
  const issuer = document.getElementById('cert-issuer').value.trim();
  const date = document.getElementById('cert-date').value.trim();
  const url = document.getElementById('cert-url').value.trim();
  
  if (!name || !issuer || !date) {
    alert('Please fill in all required fields');
    return;
  }
  
  const certificationsList = document.getElementById('certifications-list');
  const div = document.createElement('div');
  div.className = 'certification-item';
  div.innerHTML = `
    <h4 contenteditable="true">${name}</h4>
    <p contenteditable="true"><strong>${issuer}</strong> | ${date}</p>
    ${url ? `<p><a href="${url}" target="_blank" contenteditable="false">View Certificate</a></p>` : ''}
    <button onclick="removeCertification(this)" class="remove-btn" title="Remove Certification">
      <i class="fas fa-trash"></i>
    </button>
  `;
  
  div.style.transform = "translateY(20px)";
  div.style.opacity = "0";
  certificationsList.appendChild(div);
  
  setTimeout(() => {
    div.style.transform = "translateY(0)";
    div.style.opacity = "1";
  }, 100);
  
  // Clear form and close modal
  document.getElementById('cert-name').value = '';
  document.getElementById('cert-issuer').value = '';
  document.getElementById('cert-date').value = '';
  document.getElementById('cert-url').value = '';
  closeModal('certificationModal');
}

function removeCertification(button) {
  if (confirm("Are you sure you want to remove this certification?")) {
    const item = button.parentElement;
    item.style.transform = "translateY(-20px)";
    item.style.opacity = "0";
    setTimeout(() => item.remove(), 300);
  }
}

// Internship Functions
function addInternship() {
  openModal('internshipModal');
}

function saveInternship() {
  const title = document.getElementById('intern-title').value.trim();
  const company = document.getElementById('intern-company').value.trim();
  const duration = document.getElementById('intern-duration').value.trim();
  const description = document.getElementById('intern-description').value.trim();
  
  if (!title || !company || !duration) {
    alert('Please fill in all required fields');
    return;
  }
  
  const internshipsList = document.getElementById('internships-list');
  const div = document.createElement('div');
  div.className = 'internship-item';
  div.innerHTML = `
    <h4 contenteditable="true">${title}</h4>
    <p contenteditable="true"><strong>${company}</strong> | ${duration}</p>
    ${description ? `<p contenteditable="true">${description}</p>` : ''}
    <button onclick="removeInternship(this)" class="remove-btn" title="Remove Experience">
      <i class="fas fa-trash"></i>
    </button>
  `;
  
  div.style.transform = "translateY(20px)";
  div.style.opacity = "0";
  internshipsList.appendChild(div);
  
  setTimeout(() => {
    div.style.transform = "translateY(0)";
    div.style.opacity = "1";
  }, 100);
  
  // Clear form and close modal
  document.getElementById('intern-title').value = '';
  document.getElementById('intern-company').value = '';
  document.getElementById('intern-duration').value = '';
  document.getElementById('intern-description').value = '';
  closeModal('internshipModal');
}

function removeInternship(button) {
  if (confirm("Are you sure you want to remove this experience?")) {
    const item = button.parentElement;
    item.style.transform = "translateY(-20px)";
    item.style.opacity = "0";
    setTimeout(() => item.remove(), 300);
  }
}

// Achievement Functions
function addAchievement() {
  openModal('achievementModal');
}

function saveAchievement() {
  const title = document.getElementById('achievement-title').value.trim();
  const date = document.getElementById('achievement-date').value.trim();
  const description = document.getElementById('achievement-description').value.trim();
  
  if (!title || !date) {
    alert('Please fill in all required fields');
    return;
  }
  
  const achievementsList = document.getElementById('achievements-list');
  const div = document.createElement('div');
  div.className = 'achievement-item';
  div.innerHTML = `
    <h4 contenteditable="true">${title}</h4>
    <p contenteditable="true"><strong>${date}</strong></p>
    ${description ? `<p contenteditable="true">${description}</p>` : ''}
    <button onclick="removeAchievement(this)" class="remove-btn" title="Remove Achievement">
      <i class="fas fa-trash"></i>
    </button>
  `;
  
  div.style.transform = "translateY(20px)";
  div.style.opacity = "0";
  achievementsList.appendChild(div);
  
  setTimeout(() => {
    div.style.transform = "translateY(0)";
    div.style.opacity = "1";
  }, 100);
  
  // Clear form and close modal
  document.getElementById('achievement-title').value = '';
  document.getElementById('achievement-date').value = '';
  document.getElementById('achievement-description').value = '';
  closeModal('achievementModal');
}

function removeAchievement(button) {
  if (confirm("Are you sure you want to remove this achievement?")) {
    const item = button.parentElement;
    item.style.transform = "translateY(-20px)";
    item.style.opacity = "0";
    setTimeout(() => item.remove(), 300);
  }
}

// Make all functions globally available
window.addEducation = addEducation;
window.saveEducation = saveEducation;
window.removeEducation = removeEducation;
window.addCertification = addCertification;
window.saveCertification = saveCertification;
window.removeCertification = removeCertification;
window.addInternship = addInternship;
window.saveInternship = saveInternship;
window.removeInternship = removeInternship;
window.addAchievement = addAchievement;
window.saveAchievement = saveAchievement;
window.removeAchievement = removeAchievement;

// Enhanced savePortfolio function with better UX
async function savePortfolio() {
  const saveBtn = document.getElementById("savePortfolio");
  const originalText = saveBtn.innerHTML;
  
  // Show loading state
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  saveBtn.disabled = true;
  
  try {
    const name = document.getElementById("name").innerText.trim();
    const bio = document.getElementById("bio").innerText.trim();
    const skills = [...document.querySelectorAll("#skills-list li")].map(li => li.innerText.trim());
    const projects = [...document.querySelectorAll(".project")].map(div => ({
      title: div.querySelector("h3").innerText.trim(),
      description: div.querySelector("p").innerText.trim()
    }));

    // Validation
    if (!name || name === "Your Name") {
      throw new Error("Please enter your name");
    }
    if (!bio || bio.includes("bio about you")) {
      throw new Error("Please write a proper bio");
    }
    if (skills.length === 0) {
      throw new Error("Please add at least one skill");
    }
    if (projects.length === 0) {
      throw new Error("Please add at least one project");
    }
    const userData = { 
    name, 
    bio, 
    skills, 
    projects,
    contact: {
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      linkedin: document.getElementById("linkedin").value.trim(),
      github: document.getElementById("github").value.trim()
      },
    education: [...document.querySelectorAll(".education-item")].map(item => ({
      degree: item.querySelector("h4").innerText.trim(),
      institution: item.querySelector("p").innerText.trim(),
      grade: item.querySelector("p:nth-child(3)") ? item.querySelector("p:nth-child(3)").innerText.trim() : ""
    })),
    certifications: [...document.querySelectorAll(".certification-item")].map(item => ({
      name: item.querySelector("h4").innerText.trim(),
      issuer: item.querySelector("p").innerText.trim(),
      url: item.querySelector("a") ? item.querySelector("a").href : ""
    })),
    internships: [...document.querySelectorAll(".internship-item")].map(item => ({
      title: item.querySelector("h4").innerText.trim(),
      company: item.querySelector("p").innerText.trim(),
      description: item.querySelector("p:nth-child(3)") ? item.querySelector("p:nth-child(3)").innerText.trim() : ""
    })),
    achievements: [...document.querySelectorAll(".achievement-item")].map(item => ({
      title: item.querySelector("h4").innerText.trim(),
      date: item.querySelector("p").innerText.trim(),
      description: item.querySelector("p:nth-child(3)") ? item.querySelector("p:nth-child(3)").innerText.trim() : ""
    })),
    lastUpdated: new Date().toISOString(),
    version: "2.0"
};
    
    
    const userId = Math.random().toString(36).substr(2, 10);
    
    await setDoc(doc(db, "portfolios", userId), userData);
    
    // Success feedback
    const shareableLink = `${window.location.origin}${window.location.pathname}?user=${userId}`;
    
    // Create a nice modal-like alert
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      z-index: 1000;
      max-width: 500px;
      text-align: center;
    `;
    
    alertDiv.innerHTML = `
      <div style="color: #10b981; font-size: 3rem; margin-bottom: 1rem;">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3 style="margin-bottom: 1rem; color: #1e293b;">Portfolio Saved Successfully!</h3>
      <p style="margin-bottom: 1.5rem; color: #64748b;">Your portfolio is now live and ready to share.</p>
      <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; word-break: break-all; font-family: monospace; font-size: 0.9rem;">
        ${shareableLink}
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button onclick="navigator.clipboard.writeText('${shareableLink}'); this.innerHTML='<i class=\\"fas fa-check\\"></i> Copied!'" 
                style="background: #667eea; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
          <i class="fas fa-copy"></i> Copy Link
        </button>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #64748b; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
      if (alertDiv.parentElement) {
        alertDiv.remove();
      }
    }, 10000);
    
  } catch (error) {
    // Error feedback
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${error.message}`;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
    console.error("Save error:", error);
  } finally {
    // Reset button
    saveBtn.innerHTML = originalText;
    saveBtn.disabled = false;
  }
}

// Enhanced loadPortfolio function
async function loadPortfolio() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user");
  if (!userId) return;

  // Show loading state
  const loadingDiv = document.createElement('div');
  loadingDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(10px);
  `;
  loadingDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 3rem; color: #667eea; margin-bottom: 1rem;">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <p style="color: #64748b; font-size: 1.1rem;">Loading portfolio...</p>
    </div>
  `;
  document.body.appendChild(loadingDiv);

  try {
    const docRef = doc(db, "portfolios", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      
      // Load data with animations
      document.getElementById("name").innerText = data.name || "Portfolio Owner";
      document.getElementById("bio").innerText = data.bio || "Welcome to my portfolio";

      const skillsList = document.getElementById("skills-list");
      skillsList.innerHTML = "";
      
      if (data.skills && data.skills.length > 0) {
        data.skills.forEach((skill, index) => {
          setTimeout(() => {
            const li = document.createElement("li");
            li.textContent = skill;
            li.contentEditable = "false";
            li.style.transform = "scale(0)";
            li.style.opacity = "0";
            skillsList.appendChild(li);
            
            setTimeout(() => {
              li.style.transform = "scale(1)";
              li.style.opacity = "1";
            }, 100);
          }, index * 100);
        });
      }

      const projectsDiv = document.getElementById("projects");
      projectsDiv.innerHTML = "";
      
      if (data.projects && data.projects.length > 0) {
        data.projects.forEach((project, index) => {
          setTimeout(() => {
            const div = document.createElement("div");
            div.className = "project";
            div.innerHTML = `
              <h3 contenteditable="false">${project.title}</h3>
              <p contenteditable="false">${project.description}</p>
            `;
            div.style.transform = "translateY(20px)";
            div.style.opacity = "0";
            projectsDiv.appendChild(div);
            
            setTimeout(() => {
              div.style.transform = "translateY(0)";
              div.style.opacity = "1";
            }, 100);
          }, index * 200);
        });
      }
      // Load contact information
if (data.contact) {
  document.getElementById("email").value = data.contact.email || "";
  document.getElementById("phone").value = data.contact.phone || "";
  document.getElementById("linkedin").value = data.contact.linkedin || "";
  document.getElementById("github").value = data.contact.github || "";
}

// Load education
const educationList = document.getElementById("education-list");
educationList.innerHTML = "";
if (data.education && data.education.length > 0) {
  data.education.forEach((edu, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "education-item";
      div.innerHTML = `
        <h4 contenteditable="false">${edu.degree}</h4>
        <p contenteditable="false">${edu.institution}</p>
        ${edu.grade ? `<p contenteditable="false">${edu.grade}</p>` : ''}
      `;
      div.style.transform = "translateY(20px)";
      div.style.opacity = "0";
      educationList.appendChild(div);
      
      setTimeout(() => {
        div.style.transform = "translateY(0)";
        div.style.opacity = "1";
      }, 100);
    }, index * 100);
  });
}

// Load certifications
const certificationsList = document.getElementById("certifications-list");
certificationsList.innerHTML = "";
if (data.certifications && data.certifications.length > 0) {
  data.certifications.forEach((cert, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "certification-item";
      div.innerHTML = `
        <h4 contenteditable="false">${cert.name}</h4>
        <p contenteditable="false">${cert.issuer}</p>
        ${cert.url ? `<p><a href="${cert.url}" target="_blank">View Certificate</a></p>` : ''}
      `;
      div.style.transform = "translateY(20px)";
      div.style.opacity = "0";
      certificationsList.appendChild(div);
      
      setTimeout(() => {
        div.style.transform = "translateY(0)";
        div.style.opacity = "1";
      }, 100);
    }, index * 100);
  });
}

// Load internships
const internshipsList = document.getElementById("internships-list");
internshipsList.innerHTML = "";
if (data.internships && data.internships.length > 0) {
  data.internships.forEach((intern, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "internship-item";
      div.innerHTML = `
        <h4 contenteditable="false">${intern.title}</h4>
        <p contenteditable="false">${intern.company}</p>
        ${intern.description ? `<p contenteditable="false">${intern.description}</p>` : ''}
      `;
      div.style.transform = "translateY(20px)";
      div.style.opacity = "0";
      internshipsList.appendChild(div);
      
      setTimeout(() => {
        div.style.transform = "translateY(0)";
        div.style.opacity = "1";
      }, 100);
    }, index * 100);
  });
}

// Load achievements
const achievementsList = document.getElementById("achievements-list");
achievementsList.innerHTML = "";
if (data.achievements && data.achievements.length > 0) {
  data.achievements.forEach((achievement, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "achievement-item";
      div.innerHTML = `
        <h4 contenteditable="false">${achievement.title}</h4>
        <p contenteditable="false">${achievement.date}</p>
        ${achievement.description ? `<p contenteditable="false">${achievement.description}</p>` : ''}
      `;
      div.style.transform = "translateY(20px)";
      div.style.opacity = "0";
      achievementsList.appendChild(div);
      
      setTimeout(() => {
        div.style.transform = "translateY(0)";
        div.style.opacity = "1";
      }, 100);
    }, index * 100);
  });
}

      // Make view-only
      document.getElementById("name").contentEditable = "false";
      document.getElementById("bio").contentEditable = "false";
      document.getElementById("new-skill").style.display = "none";
      document.getElementById("addSkill").style.display = "none";
      document.getElementById("addProject").style.display = "none";
      document.getElementById("savePortfolio").style.display = "none";
      // Make contact inputs read-only
      document.getElementById("email").readOnly = true;
      document.getElementById("phone").readOnly = true;
      document.getElementById("linkedin").readOnly = true;
      document.getElementById("github").readOnly = true;

      // Hide add buttons for new sections
      document.getElementById("addEducation").style.display = "none";
      document.getElementById("addCertification").style.display = "none";
      document.getElementById("addInternship").style.display = "none";
      document.getElementById("addAchievement").style.display = "none";
      // Show download button
      document.getElementById("downloadPdf").style.display = "inline-flex";

      // Update page title
      document.title = `${data.name} - Portfolio`;
      
    } else {
      // Portfolio not found
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        z-index: 1001;
        text-align: center;
      `;
      errorDiv.innerHTML = `
        <div style="color: #ef4444; font-size: 3rem; margin-bottom: 1rem;">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h3 style="margin-bottom: 1rem; color: #1e293b;">Portfolio Not Found</h3>
        <p style="margin-bottom: 1.5rem; color: #64748b;">The portfolio you're looking for doesn't exist or has been removed.</p>
        <button onclick="window.location.href = window.location.pathname" 
                style="background: #667eea; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">
          Create New Portfolio
        </button>
      `;
      document.body.appendChild(errorDiv);
    }
  } catch (error) {
    console.error("Load error:", error);
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Error loading portfolio: ${error.message}`;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  } finally {
    // Remove loading screen
    setTimeout(() => loadingDiv.remove(), 500);
  }
}

// Enhanced setupDownloadButton function
function setupDownloadButton() {
  document.getElementById("downloadPdf").addEventListener("click", async () => {
    const downloadBtn = document.getElementById("downloadPdf");
    const originalText = downloadBtn.innerHTML;
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    try {
      const element = document.getElementById("portfolio-container");
      const name = document.getElementById("name").innerText.trim() || "Portfolio";
      
      const opt = {
        margin: 0.5,
        filename: `${name.replace(/\s+/g, '_')}_Portfolio.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };
      
      await html2pdf().set(opt).from(element).save();
      
      // Success feedback
      downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
      setTimeout(() => {
        downloadBtn.innerHTML = originalText;
      }, 2000);
      
    } catch (error) {
      console.error("PDF generation error:", error);
      downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
      setTimeout(() => {
        downloadBtn.innerHTML = originalText;
      }, 2000);
    } finally {
      downloadBtn.disabled = false;
    }
  });
}

// Enhanced skill input with Enter key support
function setupSkillInput() {
  const skillInput = document.getElementById("new-skill");
  skillInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addSkill();
    }
  });
}

// Add smooth scrolling and animations
function addSmoothAnimations() {
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .skills-grid li {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .skill-input:invalid {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `;
  document.head.appendChild(style);
}

// Initialize tooltips for better UX
function initializeTooltips() {
  const editableElements = document.querySelectorAll('[contenteditable="true"]');
  editableElements.forEach(element => {
    element.addEventListener('focus', () => {
      if (!element.dataset.tooltipShown) {
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
          position: absolute;
          background: #1e293b;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        tooltip.textContent = 'Click to edit • Press Enter to save';
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        setTimeout(() => tooltip.style.opacity = '1', 100);
        setTimeout(() => {
          tooltip.style.opacity = '0';
          setTimeout(() => tooltip.remove(), 300);
        }, 3000);
        
        element.dataset.tooltipShown = 'true';
      }
    });
  });
}

// Performance optimization: Debounce auto-save
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Auto-save functionality (optional)
const autoSave = debounce(() => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user");
  if (userId) {
    // Only auto-save in edit mode
    return;
  }
  
  // Save to localStorage as draft
  const draftData = {
    name: document.getElementById("name").innerText.trim(),
    bio: document.getElementById("bio").innerText.trim(),
    skills: [...document.querySelectorAll("#skills-list li")].map(li => li.innerText.trim()),
    projects: [...document.querySelectorAll(".project")].map(div => ({
      title: div.querySelector("h3").innerText.trim(),
      description: div.querySelector("p").innerText.trim()
    })),
    timestamp: Date.now()
  };
  
  try {
    localStorage.setItem('portfolio_draft', JSON.stringify(draftData));
  } catch (e) {
    console.log('Draft save disabled in this environment');
  }
}, 2000);

// Load draft on page load
function loadDraft() {
  try {
    const draft = localStorage.getItem('portfolio_draft');
    if (draft) {
      const data = JSON.parse(draft);
      const timeDiff = Date.now() - data.timestamp;
      
      // Only load draft if it's less than 24 hours old
      if (timeDiff < 24 * 60 * 60 * 1000) {
        if (confirm('Found a recent draft. Would you like to restore it?')) {
          if (data.name && data.name !== 'Your Name') {
            document.getElementById("name").innerText = data.name;
          }
          if (data.bio) {
            document.getElementById("bio").innerText = data.bio;
          }
          // Don't auto-restore skills and projects to avoid confusion
        }
      }
    }
  } catch (e) {
    console.log('Draft loading disabled in this environment');
  }
}

// Event Listeners
document.getElementById("addSkill").addEventListener("click", addSkill);
document.getElementById("addProject").addEventListener("click", addProject);
document.getElementById("savePortfolio").addEventListener("click", savePortfolio);
// Setup modal close buttons
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    closeModal(modalId);
  });
});

// Setup modal save buttons
document.getElementById('saveEducation').addEventListener('click', saveEducation);
document.getElementById('saveCertification').addEventListener('click', saveCertification);
document.getElementById('saveInternship').addEventListener('click', saveInternship);
document.getElementById('saveAchievement').addEventListener('click', saveAchievement);

// Setup add buttons
document.getElementById('addEducation').addEventListener('click', addEducation);
document.getElementById('addCertification').addEventListener('click', addCertification);
document.getElementById('addInternship').addEventListener('click', addInternship);
document.getElementById('addAchievement').addEventListener('click', addAchievement);
// Initialize everything when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  loadPortfolio();
  setupDownloadButton();
  setupSkillInput();
  addSmoothAnimations();
 
  // Only initialize editing features if not in view mode
  const params = new URLSearchParams(window.location.search);
  if (!params.get("user")) {
    initializeTooltips();
    loadDraft();
    
    // Add auto-save listeners
    document.addEventListener('input', autoSave);
    document.addEventListener('blur', autoSave, true);
  }
  
  // Add welcome message for new users
  setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("user") && document.getElementById("name").innerText === "Your Name") {
      const welcomeDiv = document.createElement('div');
      welcomeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        max-width: 300px;
      `;
      welcomeDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fas fa-rocket"></i>
          <strong>Welcome!</strong>
        </div>
        <p style="font-size: 0.9rem; margin: 0;">Click on any text to edit it. Add your skills and projects to get started!</p>
        <button onclick="this.parentElement.remove()" style="position: absolute; top: 0.5rem; right: 0.5rem; background: none; border: none; color: white; cursor: pointer;">
          <i class="fas fa-times"></i>
        </button>
      `;
      document.body.appendChild(welcomeDiv);
      
      setTimeout(() => {
        if (welcomeDiv.parentElement) {
          welcomeDiv.style.opacity = '0';
          welcomeDiv.style.transform = 'translateX(-100%)';
          setTimeout(() => welcomeDiv.remove(), 300);
        }
      }, 8000);
    }
  }, 1000);
});