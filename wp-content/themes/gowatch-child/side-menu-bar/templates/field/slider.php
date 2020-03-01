<div class="form-group">
  <label for="<?php echo $id; ?>"><?php echo $label; ?></label>
  <input type="range" class="form-control-range" name="<?php echo $id; ?>" id="<?php echo $id; ?>">
  <div class="label-min-max">
    <?php if(!empty($label_min)): ?>
    <span class="lbl-min"><?php echo $label_min; ?></span>
    <?php endif;//end !empty($label_min) ?>
    <?php if(!empty($label_max)): ?>
    <span class="lbl-max" style="float:right"><?php echo $label_max; ?></span>
    <?php endif;//end !empty($label_max) ?>
  </div>
</div>