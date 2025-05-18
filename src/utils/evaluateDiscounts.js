function evaluateDiscounts(originalPrice, discounts) {
  let price = originalPrice;
  let totalDiscount = 0;
  let capLimit = -1;
  const applied = [];

  for (const d of discounts) {
    switch (d.type) {
      case 'fixed': {
        const amount = d.value;
        price -= amount;
        totalDiscount += amount;
        applied.push({ type: 'fixed', amount });
        break;
      }

      case 'percentage': {
        const amount = price * d.value / 100;
        price -= amount;
        totalDiscount += amount;
        applied.push({ type: 'percentage', amount });
        break;
      }

      case 'conditional': {
        if (originalPrice > d.condition) {
          const amount = d.value;
          price -= amount;
          totalDiscount += amount;
          applied.push({ type: 'conditional', amount });
        }
        break;
      }

      case 'tiered': {
        for (const tier of d.tiers || []) {
          if (originalPrice >= tier.min && originalPrice <= tier.max) {
            const amount = tier.value;
            price -= amount;
            totalDiscount += amount;
            applied.push({ type: 'tiered', amount });
            break;
          }
        }
        break;
      }

      case 'cap': {
        capLimit = d.maxDiscount;
        break;
      }
    }
  }

  // Apply cap
  if (capLimit >= 0 && totalDiscount > capLimit) {
    price = originalPrice - capLimit;
    applied.push({
      type: 'cap',
      originalDiscountTotal: totalDiscount,
      cappedAt: capLimit,
    });
  }

  if (price < 0) price = 0;

  return { finalPrice: price, applied };
}

module.exports = { evaluateDiscounts };