class ShippingCost {
    calculateCost(weight) {
        // Complex shipping cost calculation logic
        return weight * 1.5;
    }
}

// New class interface expected by the client but not yet ready
class ShippingService {
    requestShippingCost(weight) {
        throw new Error("Do Not know how to implement");
    }
}

// Adapter: Adapts LegacyShipping to the new interface
class ShippingAdapter extends ShippingService {
    constructor() {
        super();
        this.ShippingCost = new ShippingCost();
    }

    requestShippingCost(weight) {
        return this.ShippingCost.calculateCost(weight);
    }
}

// Client code
const weight = 5; // Weight of the package
const cost = new ShippingAdapter().requestShippingCost(weight);

console.log(`Shipping cost for ${weight} kg: $${cost}`);