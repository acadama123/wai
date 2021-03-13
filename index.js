// https://johnresig.com/blog/learning-from-twitter/#postcomment
const bodySectionList = getBodySections();
const sectionSwitchThreshold = calcViewportThreshold();
let curSectionIdx = determineCurSectionIdx();
if (curSectionIdx != 0) {
    // For when users reloads while on a section different from the home section.
    changeNavlinkEmphasis(0, curSectionIdx);
}
let scrollThrottleTimer = 0;

$(window).scroll(function() {
    if (scrollThrottleTimer) {
        clearTimeout(scrollThrottleTimer);
    }

    scrollThrottleTimer = setTimeout(updateNavLink, 100);
});

function getBodySections() {
    return $("body > section");
}

function calcViewportThreshold() {
    const thresholdRatio = 0.5; // 0.5 means threshold is at midline of viewport
    return Math.floor(window.innerHeight * thresholdRatio);
}

function determineCurSectionIdx() {
    const curScrollPos = $(window).scrollTop();
    const curThresholdPos = curScrollPos + sectionSwitchThreshold;
    for (let i = 1; i < bodySectionList.length; i++) {
        const tempSection = $("#" + bodySectionList[i].id);
        const tempSectionPos = tempSection.offset()["top"];
        if (curThresholdPos < tempSectionPos) {
            return i-1;
        }
    }
    return bodySectionList.length - 1;
}

function updateNavLink() {
    const tempSectionIdx = determineCurSectionIdx();
    if (curSectionIdx != tempSectionIdx) {
        changeNavlinkEmphasis(curSectionIdx, tempSectionIdx);
        curSectionIdx = tempSectionIdx;
    }
}

function changeNavlinkEmphasis(oldSectionIdx, newSectionIdx) {
    const oldSectionNavLink = $("#nav-link-" + bodySectionList[oldSectionIdx].id);
    const newSectionNavLink = $("#nav-link-" + bodySectionList[newSectionIdx].id);
    oldSectionNavLink.removeClass("active");
    newSectionNavLink.addClass("active");
}
