var btnSubmit       = document.getElementById("btnSubmit");
var txtEndpoint     = document.getElementById("endpoint");
var txtUser         = document.getElementById("user");
var txtPassword     = document.getElementById("password");

function getItemsXML(){
    var returnXML = '';
    var table = document.getElementById("salesLineTable");
    var itemId, salesQty, salesUnit;

    for(i = 1; i < table.rows.length; i++)
    {
        var cells = table.rows.item(i).cells;

        itemId      = cells.item(0).innerHTML;
        salesQty    = cells.item(1).innerHTML;
        salesUnit   = cells.item(2).innerHTML;

        returnXML += '<SalesLine class="entity">'+
             '<ItemId>'+ itemId + '</ItemId>'+
             '<SalesQty>'+ salesQty + '</SalesQty>'+
             '<SalesUnit>'+ salesUnit + '</SalesUnit>'+
             '</SalesLine>';
    }

    return returnXML;

};

function buildXMLDocument(){
    var xml;
    var txtCustAccount = document.getElementById("custAccount");
    var txtReqNumber = document.getElementById("purchOrderFormNum");
    var txtTransDate = document.getElementById("receiptDate");
    var salesLineXML = getItemsXML();

    xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<s:Header>' +
            '<h:CallContext xmlns:h="http://schemas.microsoft.com/dynamics/2010/01/datacontracts" xmlns="http://schemas.microsoft.com/dynamics/2010/01/datacontracts" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                '<Company>'+ 'BRMF' + '</Company>' + //COMPANY
                '<Language xsi:nil="true" />' +
                '<LogonAsUser xsi:nil="true" />' +
                '<MessageId xsi:nil="true" />' +
                '<PartitionKey xsi:nil="true" />' +
                '<PropertyBag xsi:nil="true" />' +
            '</h:CallContext>' +
        '</s:Header>' +
        '<s:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
            '<SalesOrderServiceCreateRequest xmlns="http://schemas.microsoft.com/dynamics/2008/01/services">' +
                '<SalesOrder xmlns="http://schemas.microsoft.com/dynamics/2008/01/documents/SalesOrder">' +
                    '<SenderId xsi:nil="true" />' +
                    '<SalesTable class="entity">' +
                    '<_DocumentHash xsi:nil="true" />' +
                    '<CustAccount>'+ txtCustAccount.value +'</CustAccount>' +
                    '<PurchOrderFormNum>'+ txtReqNumber.value +'</PurchOrderFormNum>' +
                    '<ReceiptDateRequested>'+ txtTransDate.value +'</ReceiptDateRequested>' +
                    salesLineXML+
                    '</SalesTable>' +
                '</SalesOrder>' +
            '</SalesOrderServiceCreateRequest>' +
        '</s:Body>' +
        '</s:Envelope>';

    return xml;
};

function callService(){
    var xmlhttp = new XMLHttpRequest();
    var endpoint, user, password;
    var message = buildXMLDocument();

    //endpoint = 'http://ws2008r2/MicrosoftDynamicsAXAif60/SalesOrderService/xppservice.svc';
    endpoint = txtEndpoint.value;

    xmlhttp.open('POST', endpoint, true, txtUser.value, txtPassword.value);

    xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8');
    xmlhttp.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/dynamics/2008/01/services/SalesOrderService/create');
    xmlhttp.withCredentials = true;

    xmlhttp.send(message);

    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
                var response = xmlhttp.responseXML.getElementsByTagName("Value");

                alert("Integration completed. SalesId: "+ response[0].childNodes[0].nodeValue);
			} else {
				alert(xmlhttp.status + ' - ' + xmlhttp.responseText + '\n' + xmlhttp.statusText);
			}
		}
	};
}

btnSubmit.addEventListener("click", function(event){
    event.preventDefault();

    callService();

});

/* <  ****** Full Envelope Sample ******

xml = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Header>' +
                '<h:CallContext xmlns:h="http://schemas.microsoft.com/dynamics/2010/01/datacontracts" xmlns="http://schemas.microsoft.com/dynamics/2010/01/datacontracts" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                    '<Company>' + 'BRMF' + '</Company>' +
                    '<Language xsi:nil="true" />' +
                    '<LogonAsUser xsi:nil="true" />' +
                    '<MessageId xsi:nil="true" />' +
                    '<PartitionKey xsi:nil="true" />' +
                    '<PropertyBag xsi:nil="true" />' +
                '</h:CallContext>' +
            '</s:Header>' +
            '<s:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                '<SalesOrderServiceCreateRequest xmlns="http://schemas.microsoft.com/dynamics/2008/01/services">' +
                    '<SalesOrder xmlns="http://schemas.microsoft.com/dynamics/2008/01/documents/SalesOrder">' +
                        '<SenderId xsi:nil="true" />' +
                        '<SalesTable class="entity">' +
                        '<_DocumentHash xsi:nil="true" />' +
                        '<BankAccount_LV xsi:nil="true" />' +
                        '<BankCentralBankPurposeCode xsi:nil="true" />' +
                        '<BankCentralBankPurposeText xsi:nil="true" />' +
                        '<CashDisc xsi:nil="true" />' +
                        '<CommissionGroup xsi:nil="true" />' +
                        '<ContactPersonId xsi:nil="true" />' +
                        '<CountyOrigDest xsi:nil="true" />' +
                        '<CreditCardAuthorization xsi:nil="true" />' +
                        '<CurBankAccount_LV xsi:nil="true" />' +
                        '<CurrencyCode xsi:nil="true" />' +
                        '<CustAccount>' + txtCustAccount.value + '</CustAccount>' +
                        '<CustBankAccount_LV xsi:nil="true" />' +
                        '<CustGroup xsi:nil="true" />' +
                        '<CustInvoiceId xsi:nil="true" />' +
                        '<CustomerRef xsi:nil="true" />' +
                        '<DefaultDimension xsi:nil="true" />' +
                        '<DeliveryName xsi:nil="true" />' +
                        '<DeliveryPostalAddress xsi:nil="true" />' +
                        '<DlvMode xsi:nil="true" />' +
                        '<DlvReason xsi:nil="true" />' +
                        '<DlvTerm xsi:nil="true" />' +
                        '<EInvoiceAccountCode xsi:nil="true" />' +
                        '<Email xsi:nil="true" />' +
                        '<EndDisc xsi:nil="true" />' +
                        '<EnterpriseNumber xsi:nil="true" />' +
                        '<ExportReason xsi:nil="true" />' +
                        '<FreightZone xsi:nil="true" />' +
                        '<InterCompanyCompanyId xsi:nil="true" />' +
                        '<InterCompanyOriginalCustAccount xsi:nil="true" />' +
                        '<InterCompanyOriginalSalesId xsi:nil="true" />' +
                        '<InterCompanyPurchId xsi:nil="true" />' +
                        '<InventLocationId xsi:nil="true" />' +
                        '<InventSiteId xsi:nil="true" />' +
                        '<InvoiceAccount xsi:nil="true" />' +
                        '<LanguageId xsi:nil="true" />' +
                        '<LineDisc xsi:nil="true" />' +
                        '<MarkupGroup xsi:nil="true" />' +
                        '<MultiLineDisc xsi:nil="true" />' +
                        '<NumberSequenceGroup xsi:nil="true" />' +
                        '<Payment xsi:nil="true" />' +
                        '<PaymentSched xsi:nil="true" />' +
                        '<PaymMode xsi:nil="true" />' +
                        '<PaymSpec xsi:nil="true" />' +
                        '<PdsCustRebateGroupId xsi:nil="true" />' +
                        '<PdsRebateProgramTMAGroup xsi:nil="true" />' +
                        '<Port xsi:nil="true" />' +
                        '<PostingProfile xsi:nil="true" />' +
                        '<PriceGroupId xsi:nil="true" />' +
                        '<ProjId xsi:nil="true" />' +
                        '<PurchId xsi:nil="true" />' +
                        '<PurchOrderFormNum>' + txtReqNumber.value + '</PurchOrderFormNum>' +
                        '<QuotationId xsi:nil="true" />' +
                        '<ReceiptDateRequested>' + txtTransDate.value + '</ReceiptDateRequested>' +
                        '<ReturnItemNum xsi:nil="true" />' +
                        '<ReturnReasonCodeId xsi:nil="true" />' +
                        '<ReturnReplacementId xsi:nil="true" />' +
                        '<SalesGroup xsi:nil="true" />' +
                        '<SalesId xsi:nil="true" />' +
                        '<SalesName xsi:nil="true" />' +
                        '<SalesOriginId xsi:nil="true" />' +
                        '<SalesPoolId xsi:nil="true" />' +
                        '<SalesUnitId xsi:nil="true" />' +
                        '<ShipCarrierAccount xsi:nil="true" />' +
                        '<ShipCarrierAccountCode xsi:nil="true" />' +
                        '<ShipCarrierDeliveryContact xsi:nil="true" />' +
                        '<ShipCarrierId xsi:nil="true" />' +
                        '<ShipCarrierName xsi:nil="true" />' +
                        '<ShipCarrierPostalAddress xsi:nil="true" />' +
                        '<smmCampaignId xsi:nil="true" />' +
                        '<StatProcId xsi:nil="true" />' +
                        '<TaxGroup xsi:nil="true" />' +
                        '<TaxPeriodPaymentCode_PL xsi:nil="true" />' +
                        '<TCSGroup_IN xsi:nil="true" />' +
                        '<TDSGroup_IN xsi:nil="true" />' +
                        '<TransactionCode xsi:nil="true" />' +
                        '<Transport xsi:nil="true" />' +
                        '<URL xsi:nil="true" />' +
                        '<VATNum xsi:nil="true" />' +
                        '<WorkerSalesResponsible xsi:nil="true" />' +
                        '<WorkerSalesTaker xsi:nil="true" />' +
                        '<SalesLine class="entity">' +
                            '<ActivityNumber xsi:nil="true" />' +
                            '<AssetId_RU xsi:nil="true" />' +
                            '<BarCode xsi:nil="true" />' +
                            '<BarCodeType xsi:nil="true" />' +
                            '<CountryRegionName_RU xsi:nil="true" />' +
                            '<CountyOrigDest xsi:nil="true" />' +
                            '<CurrencyCode xsi:nil="true" />' +
                            '<CustAccount xsi:nil="true" />' +
                            '<CustGroup xsi:nil="true" />' +
                            '<CustomerRef xsi:nil="true" />' +
                            '<CustomsDocNumber_MX xsi:nil="true" />' +
                            '<CustomsName_MX xsi:nil="true" />' +
                            '<DefaultDimension xsi:nil="true" />' +
                            '<DeliveryName xsi:nil="true" />' +
                            '<DeliveryPostalAddress xsi:nil="true" />' +
                            '<DeliveryTaxGroup_BR xsi:nil="true" />' +
                            '<DeliveryTaxItemGroup_BR xsi:nil="true" />' +
                            '<DlvMode xsi:nil="true" />' +
                            '<EInvoiceAccountCode xsi:nil="true" />' +
                            '<ExternalItemId xsi:nil="true" />' +
                            '<InterCompanyInventTransId xsi:nil="true" />' +
                            '<InventDimId xsi:nil="true" />' +
                            '<InventRefId xsi:nil="true" />' +
                            '<InventRefTransId xsi:nil="true" />' +
                            '<InventTransId xsi:nil="true" />' +
                            '<InventTransIdReturn xsi:nil="true" />' +
                            '<InvoiceGTDId_RU xsi:nil="true" />' +
                            '<ItemBOMId xsi:nil="true" />' +
                            '<ItemId>'+ itemId +'</ItemId>' +
                            '<ItemPBAId xsi:nil="true" />' +
                            '<ItemRouteId xsi:nil="true" />' +
                            '<LedgerDimension xsi:nil="true" />' +
                            '<LineHeader xsi:nil="true" />' +
                            '<MatchingAgreementLine xsi:nil="true" />' +
                            '<Name xsi:nil="true" />' +
                            '<PackingUnit xsi:nil="true" />' +
                            '<PdsItemRebateGroupId xsi:nil="true" />' +
                            '<Port xsi:nil="true" />' +
                            '<PostingProfile_RU xsi:nil="true" />' +
                            '<ProjCategoryId xsi:nil="true" />' +
                            '<ProjId xsi:nil="true" />' +
                            '<ProjLinePropertyId xsi:nil="true" />' +
                            '<ProjTransId xsi:nil="true" />' +
                            '<PropertyNumber_MX xsi:nil="true" />' +
                            '<PSAContractLineNum xsi:nil="true" />' +
                            '<PurchorderFormNum xsi:nil="true" />' +
                            '<RetailVariantId xsi:nil="true" />' +
                            '<ReturnDispositionCodeId xsi:nil="true" />' +
                            '<SalesCategory xsi:nil="true" />' +
                            '<SalesGroup xsi:nil="true" />' +
                            '<SalesId xsi:nil="true" />' +
                            '<SalesQty>' + salesQty + '</SalesQty>' +
                            '<SalesUnit>' + salesUnit + '</SalesUnit>' +
                            '<ServiceOrderId xsi:nil="true" />' +
                            '<ShipCarrierAccount xsi:nil="true" />' +
                            '<ShipCarrierAccountCode xsi:nil="true" />' +
                            '<ShipCarrierId xsi:nil="true" />' +
                            '<ShipCarrierName xsi:nil="true" />' +
                            '<ShipCarrierPostalAddress xsi:nil="true" />' +
                            '<StatProcId xsi:nil="true" />' +
                            '<TaxGroup xsi:nil="true" />' +
                            '<TaxItemGroup xsi:nil="true" />' +
                            '<TaxWithholdGroup xsi:nil="true" />' +
                            '<TaxWithholdItemGroupHeading_TH xsi:nil="true" />' +
                            '<TransactionCode xsi:nil="true" />' +
                            '<Transport xsi:nil="true" />' +
                        '</SalesLine>'+
                        '</SalesTable>' +
                    '</SalesOrder>' +
                '</SalesOrderServiceCreateRequest>' +
            '</s:Body>' +
            '</s:Envelope>'
*/