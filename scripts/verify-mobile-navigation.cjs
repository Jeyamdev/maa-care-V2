// Disposable browser context: never accesses device/user AsyncStorage records.
const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' });
    const page = await context.newPage();
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    const base='http://127.0.0.1:4176';
    const click=async name=>page.getByRole('button',{name,exact:true}).click();
    await page.goto(base); await click('அமைப்புகள்'); await page.getByText('சேமிப்பு',{exact:true}).waitFor();
    await page.goto(base); await click('செயலி பற்றி'); await page.getByText('மேற்கோள்',{exact:true}).waitFor();
    await page.goto(base); await click('மதிப்பீட்டைத் தொடங்கு'); await click('மதிப்பீட்டைத் தொடங்கு');
    await click('அடுத்து'); await page.getByText('தொடர்வதற்கு முன் ஒரு பதிலைத் தேர்ந்தெடுக்கவும்.').waitFor();
    const answers=[0,0,3,0,3,3,3,3,3,2];
    for(let i=0;i<10;i++) {
      await page.getByRole('radio').nth(answers[i]).click();
      if(i===1) { await click('முந்தையது'); assert.equal(await page.getByRole('radio').nth(0).getAttribute('aria-checked'),'true'); await click('அடுத்து'); }
      await click(i===9?'முடி':'அடுத்து');
    }
    await page.getByText('முடிவு வரலாற்றில் சேமிக்கப்பட்டது.',{exact:true}).waitFor();
    await page.getByText('குறைந்த ஆபத்து',{exact:true}).waitFor();
    await page.getByText('உதவி பெறுவதற்கான முக்கிய பரிந்துரை',{exact:true}).waitFor();
    const records=await page.evaluate(()=>JSON.parse(localStorage.getItem('EPDS_HISTORY')));
    assert.equal(records.length,1); assert.equal(records[0].score,1); assert.equal(records[0].safetyAlert,true);
    await click('பதில்களின் விவரங்களைப் பார்'); await page.getByText('ஒவ்வொரு கேள்வியின் விவரம்',{exact:true}).waitFor();
    await page.goto(base+'/history'); await page.getByText('பாதுகாப்பு எச்சரிக்கை உள்ளது',{exact:false}).waitFor();
    await click('விவரங்களைப் பார் →'); await page.getByText('ஒவ்வொரு கேள்வியின் விவரம்',{exact:true}).waitFor();
    await page.goto(base+'/result?answers='+encodeURIComponent(JSON.stringify(answers)));
    await page.getByText('உதவி பெறுவதற்கான முக்கிய பரிந்துரை',{exact:true}).waitFor();
    await page.goto(base+'/assessmentDetail?assessment='+encodeURIComponent(JSON.stringify(records[0])));
    await page.getByText('ஒவ்வொரு கேள்வியின் விவரம்',{exact:true}).waitFor();
    await context.setOffline(true);
    // Existing hydrated client UI and saved-record details remain usable offline.
    await page.getByRole('button',{name:/கேள்வி 1 ·/}).click();
    await page.getByText('உங்கள் பதில்',{exact:true}).waitFor();
    const unexpected=errors.filter(e=>!e.includes('#418'));
    assert.deepEqual(unexpected,[]);
    console.log('PASS: mobile Home/Settings/About/Guide/10 questions/validation/previous/Results/auto-save/Detail/History/both aliases/offline details.');
    console.log('Known baseline Expo static hydration warnings (#418):',errors.length-unexpected.length);
  } finally { await browser.close(); }
})().catch(error=>{ console.error(error);process.exitCode=1; });
