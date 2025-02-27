const DOMAIN = "__DOMAIN__";
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("userForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const url = `${DOMAIN}/api/users`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();
        document.getElementById("response").innerText = result.message;
    });

    const container = document.getElementById('scrollContainer');
    let imageCount = 0;

    async function fetchHTML(url) {
        const response = await fetch(url);
        return response.text();
    }

    async function generateScrolls() {
        const response =  await fetch("/scrolls.json");
        const parser = new DOMParser();
        const data =  response.json();


        console.log("Response:", response);

        data.scrolls.map(scroll, async scrollIndex => {
            const scrollName = Object.keys(scroll)[0]
            const scrollDiv = document.createElement('div');
            scrollDiv.classList.add('scroll');

            // Scroll Collapsible Button
            const scrollHeader = document.createElement('button');
            scrollHeader.classList.add('collapsible');
            scrollHeader.textContent = `Scroll ${scrollIndex + 1}`;
            scrollDiv.appendChild(scrollHeader);

            // Scroll Content (Initially Hidden)
            const panelContainer = document.createElement('div');
            panelContainer.classList.add('panel-container');
            // panelContainer.style.display = 'none';

            const imgHtml = await fetchHTML(`scrolls/${scrollName}/img/`);
            const imgDoc = parser.parseFromString(imgHtml, 'text/html');
            const images = [...imgDoc.querySelectorAll('a')]
                .map(a => a.textContent)
                .filter(name => name.endsWith('.jpg'));

            images.forEach((imgFile, panelIndex) => {
                imageCount++;
                const imageId = imageCount;
                const panelWrapper = document.createElement('div');
                panelWrapper.classList.add('panel-wrapper');

                // Panel Collapsible Button
                const panelHeader = document.createElement('button');
                panelHeader.classList.add('panel-collapsible');
                panelHeader.textContent = `Panel ${panelIndex + 1}`;
                panelWrapper.appendChild(panelHeader);

                // Panel Content (Initially Hidden)
                const panelContent = document.createElement('div');
                panelContent.classList.add('panel');
                // panelContent.style.display = 'none';

                panelContent.innerHTML = `
                        <div class="section">
                            <img id="image-${imageId}" src="scrolls/${scrollName}/img/${imgFile}" alt="Frame Image" style="max-width: 100%; max-height: 400px; display: block; margin: 0 auto; object-fit: contain;">
                            <p style="text-align: center; margin-top: 10px;">Image ${imageId} in Panel ${panelIndex + 1} in Scroll ${scrollIndex + 1}</p>
                        </div>
                        <div class="section">
                            <label>Overall Rating:</label>
                            <div class="stars">
                                <input type="radio" id="star5-${scrollIndex}-${panelIndex}" name="rating-${scrollIndex}-${panelIndex}" value="5">
                                <label for="star5-${scrollIndex}-${panelIndex}">&#9733;</label>
                                <input type="radio" id="star4-${scrollIndex}-${panelIndex}" name="rating-${scrollIndex}-${panelIndex}" value="4">
                                <label for="star4-${scrollIndex}-${panelIndex}">&#9733;</label>
                                <input type="radio" id="star3-${scrollIndex}-${panelIndex}" name="rating-${scrollIndex}-${panelIndex}" value="3">
                                <label for="star3-${scrollIndex}-${panelIndex}">&#9733;</label>
                                <input type="radio" id="star2-${scrollIndex}-${panelIndex}" name="rating-${scrollIndex}-${panelIndex}" value="2">
                                <label for="star2-${scrollIndex}-${panelIndex}">&#9733;</label>
                                <input type="radio" id="star1-${scrollIndex}-${panelIndex}" name="rating-${scrollIndex}-${panelIndex}" value="1" required>
                                <label for="star1-${scrollIndex}-${panelIndex}">&#9733;</label>
                            </div>
                        </div>
                        <div class="section">
                            <label for="review-${scrollIndex}-${panelIndex}">Write Your Review:</label>
                            <textarea id="review-${scrollIndex}-${panelIndex}" name="review-${scrollIndex}-${panelIndex}" rows="4" placeholder="What did you like or dislike?" required></textarea>
                        </div>
                        <div class="section">
                            <button type="submit" class="submit-button">Submit</button>
                        </div>
                    `;

                panelWrapper.appendChild(panelContent);
                panelContainer.appendChild(panelWrapper);
                imageCount++;
            });

            scrollDiv.appendChild(panelContainer);
            container.appendChild(scrollDiv);
        });
    }

    generateScrolls();
});
