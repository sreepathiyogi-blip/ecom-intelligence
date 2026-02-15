import React, { useState } from "react";
import { createRoot } from "react-dom/client";

// --- Icons (SVG Components) ---
const LayoutIcon = () => (
  React.createElement('svg', { className: "icon", viewBox: "0 0 24 24" },
    React.createElement('rect', { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
    React.createElement('line', { x1: "3", x2: "21", y1: "9", y2: "9" }),
    React.createElement('line', { x1: "9", x2: "9", y1: "21", y2: "9" })
  )
);

const SearchIcon = () => (
  React.createElement('svg', { className: "icon", viewBox: "0 0 24 24" },
    React.createElement('circle', { cx: "11", cy: "11", r: "8" }),
    React.createElement('path', { d: "m21 21-4.3-4.3" })
  )
);

const PackageIcon = () => (
  React.createElement('svg', { className: "icon", viewBox: "0 0 24 24" },
    React.createElement('path', { d: "m7.5 4.27 9 5.15" }),
    React.createElement('path', { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
    React.createElement('path', { d: "m3.3 7 8.7 5 8.7-5" }),
    React.createElement('path', { d: "M12 22v-10" })
  )
);

const TrendingUpIcon = () => (
  React.createElement('svg', { className: "icon", viewBox: "0 0 24 24" },
    React.createElement('polyline', { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
    React.createElement('polyline', { points: "17 6 23 6 23 12" })
  )
);

const DownloadIcon = () => (
  React.createElement('svg', { className: "icon", viewBox: "0 0 24 24" },
    React.createElement('path', { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    React.createElement('polyline', { points: "7 10 12 15 17 10" }),
    React.createElement('line', { x1: "12", x2: "12", y1: "15", y2: "3" })
  )
);

const LoaderIcon = () => (
  React.createElement('svg', { className: "icon animate-spin", viewBox: "0 0 24 24" },
    React.createElement('path', { d: "M21 12a9 9 0 1 1-6.219-8.56" })
  )
);

const AlertCircleIcon = () => (
  React.createElement('svg', { className: "icon", viewBox: "0 0 24 24" },
    React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
    React.createElement('line', { x1: "12", x2: "12", y1: "8", y2: "12" }),
    React.createElement('line', { x1: "12", x2: "12.01", y1: "16", y2: "16" })
  )
);

// --- Styles ---
const styles = {
  appContainer: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    position: "fixed",
    height: "100vh",
    top: 0,
    left: 0,
    overflowY: "auto",
  },
  main: {
    flex: 1,
    marginLeft: "260px",
    padding: "2rem",
    maxWidth: "1600px",
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    marginBottom: "0.5rem",
    backgroundColor: active ? "#1e293b" : "transparent",
    color: active ? "#fff" : "#94a3b8",
    transition: "all 0.2s",
    fontWeight: active ? 600 : 400,
  }),
  card: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.8rem",
    borderRadius: "0.375rem",
    border: "1px solid #e2e8f0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.375rem",
    border: "none",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "background-color 0.2s",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.875rem",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: 600,
    backgroundColor: "#f8fafc",
  },
  td: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    verticalAlign: "middle",
  },
  badge: (type) => ({
    display: "inline-block",
    padding: "0.2rem 0.5rem",
    borderRadius: "9999px",
    fontSize: "0.7rem",
    fontWeight: 600,
    backgroundColor: type === "Sponsored" ? "#fef3c7" : "#dcfce7",
    color: type === "Sponsored" ? "#92400e" : "#166534",
  }),
  stockBadge: (status) => ({
    display: "inline-block",
    padding: "0.2rem 0.5rem",
    borderRadius: "9999px",
    fontSize: "0.7rem",
    fontWeight: 600,
    backgroundColor: status === "In Stock" ? "#dcfce7" : status === "Low Stock" ? "#ffedd5" : "#fee2e2",
    color: status === "In Stock" ? "#166534" : status === "Low Stock" ? "#9a3412" : "#991b1b",
  }),
};

// --- Helper: CSV Export ---
const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ? String(row[header]).replace(/"/g, '""') : "";
          return `"${val}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Data Generation Functions using Claude API ---
const generateRankData = async (keyword, limit, platform) => {
  const platformUrls = {
    "Amazon India": "amazon.in",
    "Flipkart": "flipkart.com",
    "Meesho": "meesho.com",
    "Myntra": "myntra.com"
  };

  const platformCurrency = {
    "Amazon India": "₹",
    "Flipkart": "₹",
    "Meesho": "₹",
    "Myntra": "₹"
  };

  const prompt = `Generate ${limit} realistic ${platform} product listings for the search keyword "${keyword}" in JSON format.

Important instructions:
- Return ONLY a valid JSON array, no markdown, no explanations, no code blocks
- Each product must have these exact fields:
  * rank: number (1 to ${limit})
  * asin: string (10-character alphanumeric ID)
  * link: string (realistic ${platformUrls[platform]} product URL)
  * title: string (realistic product name, 5-15 words)
  * price: string (format: "${platformCurrency[platform]}XXX" or "${platformCurrency[platform]}X,XXX")
  * rating: number (between 3.5 and 5.0, one decimal)
  * reviews: number (realistic count: 50-50000)
  * type: string ("Sponsored" for ~20% of products, "Organic" for others)
  * timestamp: string (current ISO timestamp)

Make the data realistic for Indian e-commerce with appropriate pricing in Indian Rupees.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          { 
            role: "user", 
            content: prompt
          }
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.content.find((item) => item.type === "text");
    
    if (!textContent) {
      throw new Error("No text response from API");
    }

    let text = textContent.text.trim();
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const parsedData = JSON.parse(text);
    
    if (!Array.isArray(parsedData)) {
      throw new Error("Response is not an array");
    }

    return parsedData;
  } catch (err) {
    console.error("Data generation error:", err);
    throw new Error(`Failed to fetch data: ${err.message}`);
  }
};

const generateProductDetails = async (inputs, platform) => {
  const platformUrls = {
    "Amazon India": "amazon.in",
    "Flipkart": "flipkart.com",
    "Meesho": "meesho.com",
    "Myntra": "myntra.com"
  };

  const platformCurrency = {
    "Amazon India": "₹",
    "Flipkart": "₹",
    "Meesho": "₹",
    "Myntra": "₹"
  };

  const inputLines = inputs.split("\n").filter(line => line.trim());
  const count = inputLines.length;

  const prompt = `Generate product details for ${count} products based on these inputs: ${inputs}

Platform: ${platform}

Important instructions:
- Return ONLY a valid JSON array, no markdown, no explanations, no code blocks
- Generate ${count} products matching the input ASINs/links
- Each product must have these exact fields:
  * asin: string (extract from input or generate 10-char alphanumeric)
  * link: string (realistic ${platformUrls[platform]} product URL)
  * title: string (realistic product name for Indian market)
  * price: string (format: "${platformCurrency[platform]}XXX")
  * rating: number (between 3.5 and 5.0)
  * reviews: number (realistic count: 100-20000)
  * stockStatus: string ("In Stock", "Low Stock", or "Out of Stock" for Amazon India; "N/A" for others)
  * timestamp: string (current ISO timestamp)

Make the data realistic for Indian e-commerce.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          { 
            role: "user", 
            content: prompt
          }
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.content.find((item) => item.type === "text");
    
    if (!textContent) {
      throw new Error("No text response from API");
    }

    let text = textContent.text.trim();
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const parsedData = JSON.parse(text);
    
    if (!Array.isArray(parsedData)) {
      throw new Error("Response is not an array");
    }

    return parsedData;
  } catch (err) {
    console.error("Product details error:", err);
    throw new Error(`Failed to fetch product details: ${err.message}`);
  }
};

// --- Components ---
const KeywordRankFetcher = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [platform, setPlatform] = useState("Amazon India");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await generateRankData(keyword, limit, platform);
      setResults(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', null,
    React.createElement('div', { style: styles.card },
      React.createElement('h2', { style: {marginTop: 0, fontSize: '1.25rem', marginBottom: '1rem'} }, 'Keyword Rank Parameters'),
      React.createElement('form', { onSubmit: handleFetch, style: {display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end'} },
        React.createElement('div', { style: {flex: 1, minWidth: '200px'} },
          React.createElement('label', { style: {display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500} }, 'Platform'),
          React.createElement('select', { 
            style: styles.input, 
            value: platform, 
            onChange: (e) => setPlatform(e.target.value)
          },
            React.createElement('option', { value: "Amazon India" }, 'Amazon India'),
            React.createElement('option', { value: "Flipkart" }, 'Flipkart'),
            React.createElement('option', { value: "Meesho" }, 'Meesho'),
            React.createElement('option', { value: "Myntra" }, 'Myntra')
          )
        ),
        React.createElement('div', { style: {flex: 2, minWidth: '300px'} },
          React.createElement('label', { style: {display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500} }, 'Keyword'),
          React.createElement('input', { 
            style: styles.input, 
            placeholder: "e.g. Wireless Headphones", 
            value: keyword,
            onChange: (e) => setKeyword(e.target.value),
            required: true
          })
        ),
        React.createElement('div', { style: {flex: 1, minWidth: '100px'} },
          React.createElement('label', { style: {display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500} }, 'Rank Limit'),
          React.createElement('input', { 
            type: "number", 
            style: styles.input, 
            min: "1", 
            max: "50",
            value: limit,
            onChange: (e) => setLimit(parseInt(e.target.value) || 10)
          })
        ),
        React.createElement('button', { type: "submit", style: {...styles.button, opacity: loading ? 0.7 : 1}, disabled: loading },
          loading ? React.createElement(LoaderIcon) : React.createElement(SearchIcon),
          loading ? "Fetching..." : "Fetch Ranks"
        )
      ),
      error && React.createElement('div', { style: {marginTop: '1rem', color: '#dc2626', display: 'flex', gap: '0.5rem', fontSize: '0.875rem', alignItems: 'center'} },
        React.createElement(AlertCircleIcon),
        ' ',
        error
      )
    ),
    
    results.length > 0 && React.createElement('div', { style: styles.card },
      React.createElement('div', { style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'} },
        React.createElement('h3', { style: {margin: 0, fontSize: '1.1rem'} }, `Results (${results.length})`),
        React.createElement('button', { style: styles.secondaryButton, onClick: () => exportToCSV(results, `rank_report_${keyword}`) },
          React.createElement(DownloadIcon),
          ' Export CSV'
        )
      ),
      React.createElement('div', { style: {overflowX: 'auto'} },
        React.createElement('table', { style: styles.table },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { style: styles.th }, 'Rank'),
              React.createElement('th', { style: styles.th }, 'Type'),
              React.createElement('th', { style: styles.th }, 'Product'),
              React.createElement('th', { style: styles.th }, 'Price'),
              React.createElement('th', { style: styles.th }, 'Rating'),
              React.createElement('th', { style: styles.th }, 'ASIN/ID'),
              React.createElement('th', { style: styles.th }, 'Time')
            )
          ),
          React.createElement('tbody', null,
            results.map((item, idx) =>
              React.createElement('tr', { key: idx },
                React.createElement('td', { style: styles.td }, `#${item.rank}`),
                React.createElement('td', { style: styles.td },
                  React.createElement('span', { style: styles.badge(item.type) }, item.type)
                ),
                React.createElement('td', { style: {...styles.td, maxWidth: '300px'} },
                  React.createElement('div', { style: {fontWeight: 500} }, item.title),
                  React.createElement('a', { href: item.link, target: "_blank", rel: "noopener noreferrer", style: {fontSize: '0.75rem', color: '#4f46e5', textDecoration: 'none'} }, 'View Product →')
                ),
                React.createElement('td', { style: styles.td }, item.price),
                React.createElement('td', { style: styles.td }, `⭐ ${item.rating} (${item.reviews})`),
                React.createElement('td', { style: {...styles.td, fontFamily: 'monospace'} }, item.asin),
                React.createElement('td', { style: {...styles.td, fontSize: '0.75rem', color: '#94a3b8'} }, new Date(item.timestamp).toLocaleTimeString())
              )
            )
          )
        )
      )
    )
  );
};

const ProductInfoFetcher = () => {
  const [inputs, setInputs] = useState("");
  const [platform, setPlatform] = useState("Amazon India");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!inputs.trim()) {
      setError("Please enter at least one ASIN or link");
      return;
    }
    
    setLoading(true);
    setError("");
    setResults([]);
    
    try {
      const data = await generateProductDetails(inputs, platform);
      setResults(data);
    } catch (err) {
      setError(err.message || "Error fetching details");
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', null,
    React.createElement('div', { style: styles.card },
      React.createElement('h2', { style: {marginTop: 0, fontSize: '1.25rem', marginBottom: '1rem'} }, 'Product Detail Fetcher'),
      React.createElement('div', { style: {marginBottom: '1rem'} },
        React.createElement('label', { style: {display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500} }, 'Platform'),
        React.createElement('div', { style: {display: 'flex', gap: '1rem', flexWrap: 'wrap'} },
          ['Amazon India', 'Flipkart', 'Meesho', 'Myntra'].map(p =>
            React.createElement('button', {
              key: p,
              onClick: () => setPlatform(p),
              style: {
                ...styles.secondaryButton,
                borderColor: platform === p ? '#4f46e5' : '#e2e8f0',
                color: platform === p ? '#4f46e5' : '#475569',
                backgroundColor: platform === p ? '#eef2ff' : '#fff'
              }
            }, p)
          )
        )
      ),
      React.createElement('div', { style: {marginBottom: '1rem'} },
        React.createElement('label', { style: {display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500} }, 'Paste Links or ASINs (One per line)'),
        React.createElement('textarea', {
          style: {...styles.input, height: '120px', fontFamily: 'monospace', resize: 'vertical'},
          placeholder: "B08N5K7541\nhttps://www.amazon.in/dp/B09...\nB07XYZ1234",
          value: inputs,
          onChange: (e) => setInputs(e.target.value)
        })
      ),
      React.createElement('button', {
        onClick: handleFetch,
        style: {...styles.button, opacity: loading ? 0.7 : 1},
        disabled: loading
      },
        loading ? React.createElement(LoaderIcon) : React.createElement(PackageIcon),
        loading ? "Analyzing..." : "Get Details"
      ),
      error && React.createElement('div', { style: {marginTop: '1rem', color: '#dc2626', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center'} },
        React.createElement(AlertCircleIcon),
        ' ',
        error
      )
    ),

    results.length > 0 && React.createElement('div', { style: styles.card },
      React.createElement('div', { style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'} },
        React.createElement('h3', { style: {margin: 0, fontSize: '1.1rem'} }, `Extracted Details (${results.length})`),
        React.createElement('button', { style: styles.secondaryButton, onClick: () => exportToCSV(results, 'product_details') },
          React.createElement(DownloadIcon),
          ' Export CSV'
        )
      ),
      React.createElement('div', { style: {overflowX: 'auto'} },
        React.createElement('table', { style: styles.table },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { style: styles.th }, 'ASIN/ID'),
              React.createElement('th', { style: styles.th }, 'Title'),
              React.createElement('th', { style: styles.th }, 'Price'),
              React.createElement('th', { style: styles.th }, 'Stock Status'),
              React.createElement('th', { style: styles.th }, 'Rating'),
              React.createElement('th', { style: styles.th }, 'Timestamp')
            )
          ),
          React.createElement('tbody', null,
            results.map((item, idx) =>
              React.createElement('tr', { key: idx },
                React.createElement('td', { style: {...styles.td, fontFamily: 'monospace', fontWeight: 600} }, item.asin),
                React.createElement('td', { style: {...styles.td, maxWidth: '350px'} },
                  React.createElement('div', null, item.title),
                  React.createElement('a', { href: item.link, target: "_blank", rel: "noopener noreferrer", style: {fontSize: '0.75rem', color: '#4f46e5', textDecoration: 'none'} }, 'Link →')
                ),
                React.createElement('td', { style: {...styles.td, fontWeight: 600} }, item.price),
                React.createElement('td', { style: styles.td },
                  platform === "Amazon India" && item.stockStatus !== "N/A"
                    ? React.createElement('span', { style: styles.stockBadge(item.stockStatus) }, item.stockStatus)
                    : React.createElement('span', { style: {color: '#94a3b8'} }, 'N/A')
                ),
                React.createElement('td', { style: styles.td },
                  `⭐ ${item.rating} `,
                  React.createElement('span', { style: {color: '#94a3b8'} }, `(${item.reviews})`)
                ),
                React.createElement('td', { style: {...styles.td, fontSize: '0.75rem', color: '#94a3b8'} }, new Date(item.timestamp).toLocaleString())
              )
            )
          )
        )
      )
    )
  );
};

const BestSellerTracker = () => (
  React.createElement('div', {
    style: {
      ...styles.card,
      textAlign: 'center',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
    React.createElement('div', {
      style: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: '#4f46e5'
      }
    }, React.createElement(TrendingUpIcon)),
    React.createElement('h2', { style: {margin: '0 0 1rem 0', fontSize: '1.75rem'} }, 'Best Seller Rank Tracker'),
    React.createElement('p', { style: {color: '#64748b', maxWidth: '500px', lineHeight: '1.6', marginBottom: '2rem'} },
      'We are currently building a powerful tool to track BSR history over time. You will be able to visualize trends, set alerts for rank drops, and monitor category performance.'
    ),
    React.createElement('div', { style: {display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#eef2ff', color: '#4f46e5', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600} },
      'Coming Soon in Q4 2025'
    )
  )
);

const App = () => {
  const [activeTab, setActiveTab] = useState("rank");

  return React.createElement('div', { style: styles.appContainer },
    React.createElement('div', { style: styles.sidebar },
      React.createElement('div', { style: {marginBottom: '3rem', fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem'} },
        React.createElement(LayoutIcon),
        React.createElement('span', null, 'E-Com Intel')
      ),
      React.createElement('nav', null,
        React.createElement('div', {
          style: styles.navItem(activeTab === "rank"),
          onClick: () => setActiveTab("rank")
        },
          React.createElement(SearchIcon),
          'Keyword Rank'
        ),
        React.createElement('div', {
          style: styles.navItem(activeTab === "info"),
          onClick: () => setActiveTab("info")
        },
          React.createElement(PackageIcon),
          'Product Info'
        ),
        React.createElement('div', {
          style: styles.navItem(activeTab === "tracker"),
          onClick: () => setActiveTab("tracker")
        },
          React.createElement(TrendingUpIcon),
          'BSR Tracker'
        )
      ),
      React.createElement('div', { style: {marginTop: 'auto', fontSize: '0.75rem', color: '#64748b', paddingTop: '2rem'} },
        'v1.1.0 Beta',
        React.createElement('br'),
        '© 2025 E-Com Intel'
      )
    ),
    React.createElement('main', { style: styles.main },
      React.createElement('header', { style: {marginBottom: '2rem'} },
        React.createElement('h1', { style: {fontSize: '1.8rem', fontWeight: 700, margin: 0} },
          activeTab === "rank" && "Keyword Rank Fetcher",
          activeTab === "info" && "Product Info Fetcher",
          activeTab === "tracker" && "Best Seller Tracker"
        ),
        React.createElement('p', { style: {color: '#64748b', marginTop: '0.5rem'} },
          activeTab === "rank" && "Track how products rank for specific keywords across Amazon India, Flipkart, Meesho & Myntra.",
          activeTab === "info" && "Bulk fetch detailed metrics for specific ASINs or Links from Indian e-commerce platforms.",
          activeTab === "tracker" && "Monitor Best Seller Rank trends over time."
        )
      ),
      activeTab === "rank" && React.createElement(KeywordRankFetcher),
      activeTab === "info" && React.createElement(ProductInfoFetcher),
      activeTab === "tracker" && React.createElement(BestSellerTracker)
    )
  );
};

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
