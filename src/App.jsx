import { useStore } from "./core/StoreContext"
import Header from "./storefront/Header.jsx"
import NavBar from "./storefront/NavBar.jsx"
import Hero from "./storefront/Hero.jsx"
import Footer from "./storefront/Footer.jsx"
import Confirmation from "./storefront/Confirmation.jsx"
import CatalogSection from "./catalog/CatalogSection.jsx"
import PickupSection from "./inventory/PickupSection.jsx"
import CartSheet from "./cart/CartSheet.jsx"
import WishlistSheet from "./wishlist/WishlistSheet.jsx"
import CheckoutDialog from "./checkout/CheckoutDialog.jsx"
import QRModal from "./payments/QRModal.jsx"

// SCREAMING ARCHITECTURE: APPLICATION COMPOSITION ROOT
export default function App() {
  const { orderPlaced } = useStore()

  if (orderPlaced) {
    return (
      <>
        <Header />
        <Confirmation />
        <Footer />
      </>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <NavBar />
      <Hero />
      <main>
        <CatalogSection />
        <PickupSection />
      </main>
      <Footer />

      {/* Paneles y modales */}
      <CartSheet />
      <WishlistSheet />
      <CheckoutDialog />
      <QRModal />
    </div>
  )
}