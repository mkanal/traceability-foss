import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { AdminPage, AdminViewTab } from '../../integration/pages/AdminPage';

let currentContractId: string;

When('navigate to administration view tab {string}', (tabName: AdminViewTab) => {
  AdminPage.navigateToTab(tabName);
  const header = AdminPage.getHeaderOfTabView(tabName);
  switch (tabName) {
    case AdminViewTab.BPN_CONFIGURATION_VIEW:
      header.contains('BPN - EDC Konfiguration').should('be.visible');
      break;
    case AdminViewTab.IMPORT_VIEW:
      header.contains('Trace-X Datenimport').should('be.visible');
      break;
    case AdminViewTab.CONTRACT_VIEW:
      header.contains('Verträge').should('be.visible');
      break;
    default: {
      throw new Error(`The View Tab header ${ tabName } did not load or is not existing`);
    }
  }
});

When('select contract with contract-id {string}', function(contractId: string) {
  currentContractId = contractId;
  AdminPage.clickCheckBoxForContractId(contractId).should('have.class', 'mat-mdc-checkbox-checked');
});

When('select the first contract in the contracts table', function() {
   AdminPage.getContractIdOfFirstContractInTable().then(contractId => {
     currentContractId = contractId;
     expect(currentContractId).not.to.be.null
   });
  cy.wait(1000);

  AdminPage.clickCheckBoxForFirstContractInTable().should('have.class', 'mat-mdc-checkbox-checked');
})

When('export selected contracts', function() {
  AdminPage.clickExportContractsButton().should('be.visible');
});

Then('exported contracts csv file is existing', function() {
  AdminPage.getExportedContractsFileData().then((data) => {
    expect(data).to.not.be.null;
  });

});

Then('exported csv file has correct content', function() {
  AdminPage.getExportedContractsFileData().then((data) => {
    let expectedData = "contractId,counterpartyAddress,creationDate,endDate,state\n" + currentContractId.trim().replace(/\n/g,'') + ",https://trace-x-edc-e2e-a.dev.demo.catena-x.net/api/v1/dsp,Mon Mar 18 2024,Thu Jan 01 1970,FINALIZED";
    expect(data).to.equal(expectedData);
  });

});
