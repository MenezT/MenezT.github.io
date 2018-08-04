$(document).ready(function(){

    // Thousand separator function for the BSF value 
    // - NO TOCAR - 
	function addCommas(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? ',' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}
		return x1 + x2;
		};
    
    // Currency prices in USD (decimal separator ' . ')
	var steem = 1.40; // Precio del STEEM en $
    var sbd = 1.17; // Precio del SBD en $
    
    // cExchange rate  
    var rate = 4000000; // Precio de la tasa en Bolivares ! ( SIN COMAS NI DECIMALES ) !
    var tax = rate - (rate * 10 / 100); // Comision tomada por la plataforma ~!|| NO TOCAR ||!~

    // Execute the selection by default
    steem_calculate();
    
    // If the selection changes, execute the corresponding function
    $('#currency_selector').on('change', function(){
        if($(this).val() == 'steem'){
            $('#currency_quantity').attr('placeholder', '0.00 STEEM');
            steem_calculate();
        }
        else if($(this).val() == 'sbd'){
            $('#currency_quantity').attr('placeholder', '0.00 SBD');
            sbd_calculate();
        }
    });

    // Calculate STEEM price related
    function steem_calculate(){
        // Execute this even if any key hasn't been pressed
        var currency_quantity = parseFloat($('#currency_quantity').val());
        var result = parseFloat(currency_quantity * steem * tax).toFixed(2);
        $('#total_quantity').val(addCommas(result));
        $('#usd_quantity').val('$ ' + (currency_quantity * steem).toFixed(2));
        if($('#currency_quantity').val() == ''){
            $('#total_quantity').val('');
            $('#usd_quantity').val('');
        };
    
        // Calculate the STEEM price when any key is pressed
        $('#currency_quantity').on('keyup', function(){
            var currency_quantity = parseFloat($(this).val());
            var result = parseFloat(currency_quantity * steem * tax).toFixed(2);
            $('#total_quantity').val(addCommas(result));
            $('#usd_quantity').val('$ ' + (currency_quantity * steem).toFixed(2));
            if($(this).val() == ''){
                $('#total_quantity').val('');
                $('#usd_quantity').val('');
            };
        });

        // Calculate the TOTAL price when any key is pressed
        $('#total_quantity').on('keyup', function(){
            var currency_quantity = parseFloat($('#currency_quantity').val());
			var total_quantity = parseFloat($(this).val());
			var result = parseFloat(total_quantity / steem / tax).toFixed(3);
			$('#currency_quantity').val(result);
            $('#usd_quantity').val('$ ' + (currency_quantity * steem).toFixed(2));
            if($(this).val() == ''){
                $('#total_quantity').val('');
                $('#usd_quantity').val('');
            };
		});
        
        // When the function gets called, set this placeholder values
        $('#currency_quantity').attr('placeholder', '0.00 STEEM');
        $('#total_quantity').attr('placeholder', '0.00 BSF');
    };


    // Calculate SBD price related
    function sbd_calculate(){
        // Execute this even if any key hasn't been pressed
        var currency_quantity = parseFloat($('#currency_quantity').val());
        var result = parseFloat(currency_quantity * sbd * tax).toFixed(2);
        $('#total_quantity').val(addCommas(result));
        $('#usd_quantity').val('$ ' + (currency_quantity * sbd).toFixed(2));
        if($('#currency_quantity').val() == ''){
            $('#total_quantity').val('');
            $('#usd_quantity').val('');
        };

        // Calculate the SBD price when any key is pressed
        $('#currency_quantity').on('keyup', function(){
            var currency_quantity = parseFloat($(this).val());
            var result = parseFloat(currency_quantity * sbd * tax).toFixed(2);
            $('#total_quantity').val(addCommas(result));
            $('#usd_quantity').val('$ ' + (currency_quantity * sbd).toFixed(2));
            if($(this).val() == ''){
                $('#total_quantity').val('');
                $('#usd_quantity').val('');
            };
            
        });

        // Calculate the TOTAL price when any key is pressed
		$('#total_quantity').on('keyup', function(){
            var currency_quantity = parseFloat($('#currency_quantity').val());
			var total_quantity = parseFloat($(this).val());
			var result = parseFloat(total_quantity / sbd / tax).toFixed(3);
			$('#currency_quantity').val(result);
            $('#usd_quantity').val('$ ' + (total_quantity * sbd).toFixed(2));
            if($(this).val() == ''){
                $('#total_quantity').val('');
                $('#usd_quantity').val('');
            };
		});
		
        $('#currency_quantity').attr('placeholder', '0.00 SBD');
        $('#total_quantity').attr('placeholder', '0.00 BSF');
    };
});