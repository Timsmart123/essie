// Replace these public placeholders with verified client details before launch.
const businessName = "Essie Chops"
const phoneDigits = "447701230000"
const whatsappMessage = `Hello ${businessName}! I'd like to place an order`

export const businessConfig = {
  name: businessName,
  phoneDisplay: "+44 (0)7701 230000",
  phoneHref: `tel:+${phoneDigits}`,
  whatsappNumber: phoneDigits,
  whatsappUrl: `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`,
  email: "hello@essiechops.co.uk",
  location: "London, United Kingdom",
  city: "London",
  country: "United Kingdom",
  countryShort: "UK",
  // countryShort: "UK",
  // countryShort: "UK",
  deliveryAreas: "Greater London (nationwide on request)",
  openingHours: "Monday-Saturday, 9am-7pm",
  typicalResponseTime: "We typically reply within 1 hour",
  socials: {
    instagram: null,
    facebook: null,
    tiktok: null,
  },
}
