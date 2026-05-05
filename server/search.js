export async function searchWeb(query) {
    try {
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        const results = [];

        if (data.AbstractText) results.push(data.AbstractText);

        if (data.RelatedTopics) {
            data.RelatedTopics.slice(0, 5).forEach(t => {
                if (t.Text) results.push(t.Text);
            });
        }

        return results.length ? results : ["No strong results found."];
    } catch (e) {
        return ["Search failed."];
    }
}
