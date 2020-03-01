<link href="<?php echo $assets_root; ?>bootstrap-4.1.3.css" rel="stylesheet" media="screen">
<?php if(false): ?>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="<?php echo $assets_root; ?>jquery-3.4.1.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="<?php echo $assets_root; ?>bootstrap-4.1.3.min.js"></script>
<?php endif;//end false ?>
<div class="bst4-wrapper">
    <div class="container-fluid">
        <nav id="navbar-right" class="navbar-right bg-light p-3">
          <ul class="nav flex-column">
            <?php foreach ($items as $key => $item): ?>
            <?php extract($item); ?>
            <li class="nav-item" id="nav-<?php echo $key; ?>">
              <button type="button" class="btn btn-light <?php echo $disabled; ?>" id="c9popup<?php echo $key; ?>-btn" title="<?php echo $tooltip; ?>"></button>
            </li>
            <?php endforeach ?>
          </ul>
        </nav>

        <?php 
        foreach ($items as $key => $item){
          extract($item);
          include __DIR__ . '/popup.php';
        } 
        ?>
    </div>
</div>
<script type="text/javascript">
    jQuery(function($){
      $(document).on('click', '#navbar-right .nav-item', function(e) {
        e.stopPropagation();
        // add class active to current button and remove it from the siblings
        $(this).toggleClass('active').siblings().not(this).removeClass('active');
      });
    });
</script>
<style type="text/css">
  .bst4-wrapper .content-wrapper .btn-light{
    border: 1px solid #ccc !important;
    margin: 5px;
    margin-left:0px;
  }
  .bst4-wrapper .form-check {
      margin: 0.5rem 0 0.5rem 0;
    }
  .bst4-wrapper .text-input-group label {
      /*display: inline-block;*/
      width: 7rem;
      /*margin-bottom: 0.5rem;*/
  }

  .bst4-wrapper .input-group {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

  .bst4-wrapper #navbar-right {
    height: 100vh;
    right: 0;
    position: absolute;
    padding: 0px !important;
  }

  .bst4-wrapper #navbar-right .nav,
  .bst4-wrapper #navbar-right .nav-item {
    margin:0px !important;
  }

  .bst4-wrapper #navbar-right .nav-item .btn{
    padding: 0px !important;
  }

  .bst4-wrapper .modal-dialog{
    position: absolute !important;
    float: right;
    right: 70px;
    top: 50px;
  }
  .bst4-wrapper .modal-dialog .modal-body{
    overflow: scroll;
  }
<?php foreach ($items as $key => $item): ?>
  <?php extract($item); ?>
  .bst4-wrapper #navbar-right #nav-<?php echo $key; ?> .btn{
/*      width: 64px;
      height: 64px;
      padding: 10px;*/
      width: 45px;
      height: 45px;
      padding: 15px !important;
      margin-top: 10px;
      background: url('<?php echo $icons_root . $icon; ?>') no-repeat center center;
      background-origin: content-box !important;
      box-sizing: border-box !important;
  } 
  .bst4-wrapper #navbar-right #nav-<?php echo $key; ?>.active .btn{
      background: url('<?php echo $icons_root . $icon_hl; ?>') no-repeat center center;
  } 
<?php endforeach ?>
</style>
<style type="text/css">
.video-figure-content{
  margin-right: 40px;
}
#side-menu-bar-wrapper{
  position: absolute;
    right: 0;
    top: 0;
}
</style>
<style type="text/css">
.c9popup-wrapper {
  display: none;
  right:70px;
  position: absolute;
/*  width: 300px;
  height: 200px;*/
  background: transparent;
}
.c9popup-title{
  padding: 15px;
  margin: 0;
  font-size: 26px;
  text-align: left;
}
.c9popup-content {
  position: relative; 
  background-color: white;
  opacity: 0.9;
  padding: 0px; 
  margin: auto; 
  border: 1px solid #aaa;
  border-radius: 5px;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

.content-wrapper{
  padding: 0 15px 15px 15px;
  overflow-y: auto;
  text-align: left;
}
.close-btn {
  float: right; 
  color: lightgray; 
  font-size: 24px;  
  font-weight: bold;
}
.close-btn:hover {
  color: darkgray;
}
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}
@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

</style>
