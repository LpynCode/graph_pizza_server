export const defaultIncludeProductsQuery = {
	picture: true,
	ingredients: {
		select: {
			ingredient: true,
		},
	},
	characteristics: {
		include: {
			characteristic: {
				include: {
					size: {
						include: { unit: true },
					},
				},
			},
		},
	},
};
