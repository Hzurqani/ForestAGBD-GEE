// ForestAGBD-GEE Green Tree Reservoir 2021 demonstration configuration.
// Copy these values into the CONFIG block in src/ForestAGBD_GEE.js.
// IMPORTANT: The ROI below is for demonstration only.

var GTR_DEMO_CONFIG = {
  roi: ee.Geometry.Polygon(
        [[[-91.78901014512353, 34.41788682426073],
          [-91.78901014512353, 34.17794008541645],
          [-91.52671156113917, 34.17794008541645],
          [-91.52671156113917, 34.41788682426073]]], null, false),
  startDate: '2021-01-01',
  endDate: '2022-01-01',
  cloudScoreThreshold: 0.50,
  s2Composite: 'median',
  s1Composite: 'mean',
  demSource: 'USGS_3DEP_1m',
  useCanopyHeight: true,
  gediRelativeSeMax: 0.50,
  gediMaxSlopeDeg: 16.699244234,
  trainFraction: 0.70,
  randomSeed: 42,
  kFolds: 10,
  modelName: 'RF'
};

// The paper reports a 30% slope threshold. Earth Engine's ee.Terrain.slope()
// returns degrees, so the reference profile uses atan(0.30) = 16.699 degrees.