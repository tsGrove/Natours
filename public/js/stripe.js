import axios from "axios";
import { showAlert } from "./alerts";
const stripe = Stripe(
  "pk_test_51PYa71C2L6ohnL3gV9jsJMuKNVrzhli9SkRQzaXy1QHDVnrd7Huy6f49ZIro407XrBLW3usyE3AP3yoAAolEwYSh00xM1EPTkb"
);

export const bookTour = async (toudID) => {
  try {
    // 1 Get Checkout Session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/booking/checkout-session/${toudID}`
    );

    // 2 Use Stripe to create checkout form + charge credit card}
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};
