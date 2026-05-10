'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('getting-started');

  const sections = {
    'getting-started': {
      title: 'Getting Started',
      content: `
        <h3 class="text-xl font-semibold text-cyan-300 mb-4">Quick Start Guide</h3>
        <p class="text-slate-300 mb-4">Get up and running with our prediction API in minutes.</p>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">1. Authentication</h4>
        <p class="text-slate-400 mb-4">No authentication required for the demo. For production, contact our sales team.</p>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">2. Making Your First Prediction</h4>
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4 font-mono text-sm text-cyan-300 overflow-x-auto">
          <pre>curl -X POST http://localhost:8000/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "Days_for_shipping_real": 7,
    "Days_for_shipment_scheduled": 5,
    "Benefit_per_order": 45.5,
    "Sales_per_customer": 300,
    "Order_Item_Discount_Rate": 0.1,
    "Order_Item_Profit_Ratio": 0.2,
    "Order_Item_Quantity": 10,
    "Sales": 1250
  }'</pre>
        </div>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">3. Response Format</h4>
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4 font-mono text-sm text-green-300 overflow-x-auto">
          <pre>{
  "prediction": 1,
  "confidence": 0.98,
  "status": "Late"
}</pre>
        </div>
      `,
    },
    'api-reference': {
      title: 'API Reference',
      content: `
        <h3 class="text-xl font-semibold text-cyan-300 mb-4">REST API Endpoints</h3>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">POST /predict</h4>
        <p class="text-slate-400 mb-4">Make a delivery prediction for a given order.</p>
        
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4">
          <p class="text-white font-semibold mb-2">Request Parameters:</p>
          <ul class="text-slate-300 space-y-2 text-sm">
            <li><span class="text-cyan-400">Days_for_shipping_real</span> (integer): Actual shipping days</li>
            <li><span class="text-cyan-400">Days_for_shipment_scheduled</span> (integer): Scheduled shipping days</li>
            <li><span class="text-cyan-400">Benefit_per_order</span> (number): Benefit per order in USD</li>
            <li><span class="text-cyan-400">Sales_per_customer</span> (number): Sales per customer</li>
            <li><span class="text-cyan-400">Order_Item_Discount_Rate</span> (number): Discount rate (0-1)</li>
            <li><span class="text-cyan-400">Order_Item_Profit_Ratio</span> (number): Profit ratio</li>
            <li><span class="text-cyan-400">Order_Item_Quantity</span> (integer): Quantity of items</li>
            <li><span class="text-cyan-400">Sales</span> (number): Total order sales</li>
          </ul>
        </div>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">GET /predictions</h4>
        <p class="text-slate-400 mb-4">Retrieve recent predictions from the database.</p>
        
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4">
          <p class="text-white font-semibold mb-2">Query Parameters:</p>
          <ul class="text-slate-300 space-y-2 text-sm">
            <li><span class="text-cyan-400">limit</span> (integer, optional): Number of records to return (default: 20)</li>
          </ul>
        </div>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">GET /health</h4>
        <p class="text-slate-400 mb-4">Check if the API service is running and healthy.</p>
      `,
    },
    'model-details': {
      title: 'Model Details',
      content: `
        <h3 class="text-xl font-semibold text-cyan-300 mb-4">XGBoost ML Model</h3>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">Model Architecture</h4>
        <ul class="text-slate-300 space-y-2 mb-4">
          <li>• <span class="text-cyan-400">Algorithm:</span> XGBoost Gradient Boosting</li>
          <li>• <span class="text-cyan-400">Training Data:</span> 100,000+ real supply chain records</li>
          <li>• <span class="text-cyan-400">Accuracy:</span> 94.2% precision on test set</li>
          <li>• <span class="text-cyan-400">Latency:</span> < 50ms average prediction time</li>
          <li>• <span class="text-cyan-400">Features:</span> 8 input dimensions</li>
        </ul>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">Model Performance</h4>
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4">
          <ul class="text-slate-300 space-y-2">
            <li>• <span class="text-green-400">Precision:</span> 94.2%</li>
            <li>• <span class="text-green-400">Recall:</span> 91.8%</li>
            <li>• <span class="text-green-400">F1-Score:</span> 93.0%</li>
            <li>• <span class="text-green-400">AUC-ROC:</span> 0.968</li>
          </ul>
        </div>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">Input Features</h4>
        <p class="text-slate-400 mb-4">The model uses 8 key features to predict delivery delays:</p>
        <ol class="text-slate-300 space-y-2 list-decimal list-inside">
          <li>Days for actual shipping</li>
          <li>Days for scheduled shipment</li>
          <li>Benefit per order</li>
          <li>Sales per customer</li>
          <li>Order item discount rate</li>
          <li>Order item profit ratio</li>
          <li>Order item quantity</li>
          <li>Total order sales</li>
        </ol>
      `,
    },
    'deployment': {
      title: 'Deployment',
      content: `
        <h3 class="text-xl font-semibold text-cyan-300 mb-4">Deployment Options</h3>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">Local Development</h4>
        <p class="text-slate-400 mb-4">Use Docker Compose for local testing:</p>
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4 font-mono text-sm text-cyan-300 overflow-x-auto">
          <pre>docker-compose up --build</pre>
        </div>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">AWS Deployment</h4>
        <p class="text-slate-400 mb-4">Deploy to production using AWS ECS, RDS, and ALB:</p>
        <ul class="text-slate-300 space-y-2 mb-4">
          <li>• Amazon ECS Fargate for containerized services</li>
          <li>• Amazon RDS PostgreSQL for data persistence</li>
          <li>• Application Load Balancer for routing</li>
          <li>• Auto-scaling based on CPU/memory</li>
          <li>• CloudWatch for monitoring and alerts</li>
        </ul>
        
        <p class="text-slate-400 mb-4">See the <span class="text-cyan-400">AWS_DEPLOYMENT_GUIDE.md</span> for step-by-step instructions.</p>
        
        <h4 class="text-lg font-semibold text-white mt-6 mb-3">Environment Variables</h4>
        <div class="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4 font-mono text-sm text-green-300">
          <pre>DATABASE_URL=postgresql+asyncpg://...
NEXT_PUBLIC_API_URL=http://localhost:8000</pre>
        </div>
      `,
    },
  };

  const tabs = Object.entries(sections).map(([key, { title }]) => ({
    key,
    title,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Hero Section */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 px-4 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-lg text-slate-400 max-w-3xl">
              Complete API documentation, deployment guides, and integration examples for the Supply Chain Late Delivery Prediction System.
            </p>
          </div>
        </section>

        {/* Documentation Tabs */}
        <section className="px-4 py-12 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Tab Navigation */}
            <div className="mb-8 border-b border-slate-700/50">
              <div className="flex gap-2 overflow-x-auto pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 font-medium rounded-lg transition whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'text-cyan-300 border-b-2 border-cyan-300 bg-slate-900/50'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-slate-900/30 border border-slate-700/30 rounded-2xl p-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: sections[activeTab as keyof typeof sections].content,
                }}
              />
            </div>

            {/* Code Examples */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/30 bg-slate-900/30 p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">Python Example</h3>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <pre>{`import requests

data = {
    "Days_for_shipping_real": 7,
    "Days_for_shipment_scheduled": 5,
    "Benefit_per_order": 45.5,
    "Sales_per_customer": 300,
    "Order_Item_Discount_Rate": 0.1,
    "Order_Item_Profit_Ratio": 0.2,
    "Order_Item_Quantity": 10,
    "Sales": 1250
}

response = requests.post(
    "http://localhost:8000/predict",
    json=data
)

print(response.json())`}</pre>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700/30 bg-slate-900/30 p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">JavaScript Example</h3>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <pre>{`const data = {
    Days_for_shipping_real: 7,
    Days_for_shipment_scheduled: 5,
    Benefit_per_order: 45.5,
    Sales_per_customer: 300,
    Order_Item_Discount_Rate: 0.1,
    Order_Item_Profit_Ratio: 0.2,
    Order_Item_Quantity: 10,
    Sales: 1250
};

const response = await fetch(
    "http://localhost:8000/predict",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
);

const result = await response.json();
console.log(result);`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to integrate?</h2>
            <p className="mb-8 text-lg text-slate-400">
              Get started with our API or deploy to your infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
              >
                Contact Sales
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-500/50 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                Try Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
