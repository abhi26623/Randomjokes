let currentPage = 1;
let totalPages = 1;
//  just testing git on git hub hello how are you 
/**
 * Fetches a specific page of jokes from the API 
 * 
 * testing the pull request feature on github
 * checking claire review feature
 * checking the pull request feature on github
 * test 3 testing the pull request feature on github
 * hello how are you
 */
async function loadJokes(page) {
    try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?page=${page}&limit=10`);
        const result = await response.json();

        if (result.success) {
            totalPages = result.data.totalPages;
            displayJokes(result.data.data);
            updateUI();
        } else {
            document.getElementById("jokes-list").innerText = "Failed to load jokes.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("jokes-list").innerText = "Oops! Something went wrong.";
    }
}

/**
 * Renders the list of jokes to the HTML
 */
function displayJokes(jokes) {
    const listContainer = document.getElementById("jokes-list");
    listContainer.innerHTML = ""; // Clear the loading text or previous jokes

    jokes.forEach((joke) => {
        // Create a wrapper for each joke
        const jokeBox = document.createElement("div");
        jokeBox.className = "joke-box";

        // Create the text element
        const jokeText = document.createElement("p");
        jokeText.innerText = joke.content;

        // Create the copy button
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.innerText = "Copy";
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(joke.content).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "Copied!";
                setTimeout(() => (copyBtn.innerText = originalText), 2000);
            });
        };

        // Append elements to the box
        jokeBox.appendChild(jokeText);
        jokeBox.appendChild(copyBtn);

        // Add the box to the main list
        listContainer.appendChild(jokeBox);
    });
}

/**
 * Updates the page number and button states
 */
function updateUI() {
    document.getElementById("page-display").innerText = `Page ${currentPage} of ${totalPages}`;
    
    const nextBtn = document.getElementById("next-page");
    const prevBtn = document.getElementById("prev-page");

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Event Listeners for pagination
document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadJokes(currentPage);
    }
});

document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadJokes(currentPage);
    }
});


// Initial load of the first page
loadJokes(currentPage);
// Triggering PR event
