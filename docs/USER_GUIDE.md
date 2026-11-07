# ForestAGBD-GEE user guide

## 1. Setup

ForestAGBD-GEE runs in the Google Earth Engine Code Editor. No local installation is required. Create or open an Earth Engine Cloud Project, paste `src/ForestAGBD_GEE.js` into the Code Editor, and ensure that billing/access rules for your Earth Engine account are satisfied.

## 2. Define the region of interest

Replace `CONFIG.roi` with an `ee.Geometry` or the geometry of an `ee.FeatureCollection`.

## 3. Choose the analysis period

Set `startDate` and `endDate`. The reference period is calendar year 2021. Check the current Earth Engine catalog before changing the period.

## 4. Configure preprocessing 

- Sentinel-2: Cloud Score+ threshold and mean/median reducer.
- Sentinel-1: mean/median reducer and SAR index calculation mode.
- Terrain: GLO-30 globally or USGS 3DEP 1m where available in the United States.
- Canopy height: optional Meta/WRI public Earth Engine asset.
- GEDI: quality flags, maximum relative standard error, and maximum slope in degrees.

## 5. Configure modeling

Select RF, CART, SVM, or GTB. The RF defaults match the supplied research script: 120 trees, 7 variables per split, minimum leaf population 5, bag fraction 0.6, and maximum 50 nodes.

The software performs a reproducible 70/30 train-holdout split and k-fold cross-validation on the training partition. Set `cvRepeats` above 1 if repeated k-fold cross-validation is desired.

## 6. Outputs

The script prints the predictor list, retained sample count, training/holdout counts, holdout metrics, cross-validation metrics, and model explanation. It creates Tasks for:

1. predicted AGBD raster;
2. holdout predictions;
3. holdout summary metrics;
4. cross-validation metrics; and
5. variable importance when supported by the selected model.

## 7. Interpreting GEDI as reference data

GEDI L4A is a model-derived biomass product, not field-measured ground truth. It is best described as calibration/reference data. For operational biomass or carbon accounting, independent field validation is recommended.

## 8. Troubleshooting

### Empty or very small training table
Check the analysis year, ROI, GEDI coverage, canopy-height mask, and slope/relative-SE thresholds.

### Canopy-height asset access error
Set `useCanopyHeight: false` or replace the asset with an accessible canopy-height image.

### 3DEP unavailable
Switch `demSource` to `GLO30`; 3DEP is a U.S.-focused product and coverage varies.

### Computation timeout
Use a smaller ROI, reduce the number of CV repeats, increase `tileScale` in sampling if needed, or export intermediate products.

### Reproducibility of sample assignments and model results
During testing, repeated executions of ForestAGBD-GEE occasionally produced different sample assignments, predictions, or validation metrics despite unchanged code, configurations, and random seeds. This variability was observed across multiple regression algorithms. A possible explanation is that Earth Engine may re-evaluate computations after cache expiration, potentially altering the distributed processing or arrival order of training observations. Stochastic model settings may also contribute to these differences.

Although fixed random seeds support repeatability, they do not guarantee identical results across executions. For reproducibility, users are encouraged to preserve the input samples, training/holdout and cross-validation assignments, model configurations, predictions, and evaluation outputs. When results differ between runs, sample identities and assignments should be compared alongside sample counts before attributing differences to model training.



