import './App.css';
import logo from './logo.svg';

function loadRazorPay(src) {
  return new Promise(resolve => {

    const script = document.createElement('script')
    // script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () =>{
      resolve(false)
    }
  })
}

function App() {

  async function displayRazorPay() {

    const res = await loadRazorPay('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		const data = await fetch('http://localhost:4000/razorpay', { method: 'POST' }).then((t) =>t.json()
		)
  console.log(data)

    const options = {
      "key": "rzp_test_QW4QKOZaNPmQJB",
      "amount": data.amount.toString(), 
      "currency": data.currency,
      "name": "Pro Shop",
      "description": "Test Transaction",
      "image": `https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg`,
      "order_id": data.id, 
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
          alert(`Successfully Payed`)
      },
      "prefill": {
          "name": "Shaikh Noman",
          "email": "sk.noman@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open()
  }

  return (
    <>
    <div className="App">
      <header className="App-header">
        <p>
          My CCL Mini Project
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Payment Gateway using Razorpay Running in Test Mode</p>
        <button
					className="App-link"
					onClick={displayRazorPay}
					target="_blank"
					rel="noopener noreferrer"
				>
					<b>DONATE Rs. 5</b>
				</button>
      </header>
    </div>
    </>
  );
}

export default App;
