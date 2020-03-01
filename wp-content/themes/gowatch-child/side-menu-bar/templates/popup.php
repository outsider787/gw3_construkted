<div id="c9popup<?php echo $key; ?>" class="c9popup<?php echo $key; ?> c9popup-wrapper">
  <div class="c9popup<?php echo $key; ?>-content c9popup-content">
    <h3 class="c9popup-title"><?php echo $title; ?><span class="close-btn">&times;</span></h3>
    <div class="content-wrapper">
      
    </div>
  </div>
</div>
<style type="text/css">
#c9popup<?php echo $key; ?> {
  <?php if($top): ?>
    top: <?php echo $top; ?>;
  <?php endif;//end $top ?>
}
#c9popup<?php echo $key; ?> .content-wrapper{
  <?php if($width): ?>
    width: <?php echo $width; ?>;
  <?php endif;//end $width ?>
  <?php if($height): ?>
    height: <?php echo $height; ?>;
  <?php endif;//end $height ?>
}
</style>
<script type="text/javascript">
    jQuery(function($){
      $("#c9popup<?php echo $key; ?> .content-wrapper").load("<?php echo $loadscript_root . $loadscript; ?>");
    });
</script>
<script type="text/javascript">
  jQuery(function($){
      let c9popupBtn = document.getElementById("c9popup<?php echo $key; ?>-btn")
      let c9popup = document.querySelector("#c9popup<?php echo $key; ?>")
      let closeBtn = document.querySelector("#c9popup<?php echo $key; ?> .close-btn")
      c9popupBtn.onclick = function(){
        <?php $skip_me_items=$items; unset($_items[$key]); ?>
        <?php foreach ($skip_me_items as $s_key => $item): ?>
          var _other_c9popup = document.querySelector("#c9popup<?php echo $s_key; ?>")
          _other_c9popup.style.display = "none"
        <?php endforeach ?>
        c9popup.style.display = "block"
      }
      closeBtn.onclick = function(){
        c9popup.style.display = "none"
      }
      window.onclick = function(e){
        if(e.target == c9popup){
          c9popup.style.display = "none"
        }
      }
  });
</script>

