document.addEventListener("DOMContentLoaded", function() {
  var answers = {};
  var currentStep = 0;
  var visibleQuestions = [];

  var hero = document.getElementById("hero");
  var checker = document.getElementById("checker");
  var resultsSection = document.getElementById("results");
  var startBtn = document.getElementById("startBtn");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var restartBtn = document.getElementById("restartBtn");
  var progressBar = document.getElementById("progressBar");
  var stepInfo = document.getElementById("stepInfo");
  var questionArea = document.getElementById("questionArea");
  var checklist = document.getElementById("checklist");
  var noItems = document.getElementById("noItems");
  var resultSummary = document.getElementById("resultSummary");

  function getVisibleQuestions() {
    return QUESTIONS.filter(function(q) {
      return !q.showIf || q.showIf(answers);
    });
  }

  function renderQuestion() {
    visibleQuestions = getVisibleQuestions();
    if (currentStep >= visibleQuestions.length) {
      showResults();
      return;
    }
    var q = visibleQuestions[currentStep];
    var html = "<h3>" + q.text + "</h3>";
    if (q.hint) {
      html += '<p style="font-size:0.83rem;color:#64748b;margin-bottom:14px;">' + q.hint + "</p>";
    }
    q.options.forEach(function(opt) {
      var sel = answers[q.id] === opt.value ? " selected" : "";
      html += '<button type="button" class="option-btn' + sel + '" data-qid="' + q.id + '" data-value="' + opt.value + '">' + opt.label + "</button>";
    });
    questionArea.innerHTML = html;

    var pct = Math.round(((currentStep) / visibleQuestions.length) * 100);
    progressBar.style.width = pct + "%";
    stepInfo.textContent = "Question " + (currentStep + 1) + " of " + visibleQuestions.length;

    prevBtn.style.display = currentStep > 0 ? "block" : "none";
    nextBtn.style.display = answers[q.id] ? "block" : "none";

    questionArea.querySelectorAll(".option-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var qid = this.getAttribute("data-qid");
        var val = this.getAttribute("data-value");
        answers[qid] = val;
        questionArea.querySelectorAll(".option-btn").forEach(function(b) { b.classList.remove("selected"); });
        this.classList.add("selected");
        nextBtn.style.display = "block";

        if (qid === "nationality" && val === "other") {
          setTimeout(function() { showResults(); }, 300);
          return;
        }
        setTimeout(function() {
          currentStep++;
          renderQuestion();
        }, 300);
      });
    });
  }

  function showResults() {
    checker.style.display = "none";
    resultsSection.style.display = "block";

    var items = evaluateAnswers(answers);
    checklist.innerHTML = "";

    if (items.length === 1 && items[0] === "not_applicable") {
      noItems.style.display = "block";
      resultSummary.textContent = "Good news! Based on your answers:";
    } else {
      noItems.style.display = "none";
      resultSummary.textContent = "Based on your answers, here are the tax filings and considerations that may apply to you:";
      items.forEach(function(key) {
        var item = FILING_ITEMS[key];
        if (!item) return;
        var div = document.createElement("div");
        div.className = "checklist-item";
        div.innerHTML = "<h4>" + item.title + "</h4>" +
          "<p>" + item.description + "</p>" +
          '<p class="deadline">Deadline: ' + item.deadline + "</p>" +
          '<a href="' + item.link + '" target="_blank" rel="noopener">' + item.linkText + " &rarr;</a>";
        checklist.appendChild(div);
      });
    }

    progressBar.style.width = "100%";
    stepInfo.textContent = "";
  }

  startBtn.addEventListener("click", function() {
    hero.style.display = "none";
    checker.style.display = "block";
    renderQuestion();
  });

  prevBtn.addEventListener("click", function() {
    if (currentStep > 0) {
      currentStep--;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", function() {
    visibleQuestions = getVisibleQuestions();
    if (currentStep < visibleQuestions.length - 1) {
      currentStep++;
      renderQuestion();
    } else {
      showResults();
    }
  });

  restartBtn.addEventListener("click", function() {
    answers = {};
    currentStep = 0;
    resultsSection.style.display = "none";
    checker.style.display = "none";
    hero.style.display = "block";
    progressBar.style.width = "0%";
    checklist.innerHTML = "";
    noItems.style.display = "none";
  });

  // Insert standard footer
  var footerEl = document.getElementById("site-footer");
  if (footerEl) {
    footerEl.innerHTML = FOOTER_HTML || "";
  }
});

// Standard footer template
var FOOTER_HTML = '<section style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:12px;padding:20px 16px;margin:24px auto;max-width:600px;text-align:center;">' +
  '<p style="font-weight:700;font-size:1.05rem;color:#166534;margin:0 0 6px;">Did this save you time?</p>' +
  '<p style="font-size:0.85rem;color:#555;margin:0 0 14px;">This tool is 100% free, no ads. Your support keeps it running.</p>' +
  '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
  '<a href="https://japantoolkit.lemonsqueezy.com/" target="_blank" rel="noopener" style="display:inline-block;padding:10px 20px;background:#7c3aed;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;min-height:44px;line-height:24px;">Support Us</a>' +
  '</div></section>' +
  '<div style="text-align:center;padding:16px 12px 4px;font-size:0.82rem;color:#888;border-top:1px solid #e0e0e033;margin-top:12px;">' +
  '<p style="margin-bottom:8px;font-weight:600;">Get Updates</p>' +
  '<form action="https://buttondown.com/api/emails/embed-subscribe/japandevtools" method="post" target="_blank" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;max-width:360px;margin:0 auto;">' +
  '<input type="email" name="email" placeholder="your@email.com" required style="padding:6px 10px;border:1px solid #ccc;border-radius:4px;font-size:0.82rem;min-width:180px;min-height:44px;">' +
  '<button type="submit" style="padding:6px 14px;background:#1e3a5f;color:#fff;border:none;border-radius:4px;font-size:0.82rem;cursor:pointer;min-height:44px;">Subscribe</button>' +
  '</form><p style="margin-top:4px;font-size:0.7rem;color:#aaa;">Free updates about new tools. No spam.</p></div>' +
  '<div style="text-align:center;padding:12px 12px 4px;font-size:0.82rem;color:#888;">' +
  '<p style="margin-bottom:6px;">Share this tool</p><p>' +
  '<button onclick="if(navigator.share){navigator.share({title:document.title,url:location.href})}else{window.open(\'https://twitter.com/intent/tweet?url=\'+encodeURIComponent(location.href)+\'&text=\'+encodeURIComponent(document.title),\'_blank\')}" style="background:none;border:1px solid #ccc;border-radius:4px;padding:4px 12px;font-size:0.8rem;cursor:pointer;color:#888;margin:0 4px;min-height:32px;">Share</button>' +
  '<a href="https://twitter.com/intent/tweet?url=" onclick="this.href=\'https://twitter.com/intent/tweet?url=\'+encodeURIComponent(location.href)+\'&text=\'+encodeURIComponent(document.title)" target="_blank" rel="noopener" style="color:#1DA1F2;text-decoration:none;font-weight:600;margin:0 6px;font-size:0.82rem;">Twitter</a>' +
  '<a href="https://reddit.com/submit?url=" onclick="this.href=\'https://reddit.com/submit?url=\'+encodeURIComponent(location.href)+\'&title=\'+encodeURIComponent(document.title)" target="_blank" rel="noopener" style="color:#FF4500;text-decoration:none;font-weight:600;margin:0 6px;font-size:0.82rem;">Reddit</a>' +
  '</p></div>' +
  '<p style="text-align:center;margin-top:2rem;font-size:0.82rem;"><a href="https://japantool.featurebase.app" target="_blank" style="color:#888;text-decoration:none;">Got feedback or feature requests? Let us know &rarr;</a></p>';
