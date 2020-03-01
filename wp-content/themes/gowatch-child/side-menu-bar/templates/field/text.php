<div class="text-input-group">
    <div class="input-group">
        <label for="<?php echo $id; ?>"><?php echo $label; ?></label>
        <?php if('yes'==$readonly): ?>
        <span><?php echo $value; ?></span>
        <?php else: ?>
        <input type="text" name="<?php echo $id; ?>" value="<?php echo $value; ?>" placeholder="<?php echo $placeholder; ?>">
        <?php endif;//end $readonly ?>
    </div>
</div>
