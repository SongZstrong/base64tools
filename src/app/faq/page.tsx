export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions (FAQ)
          </h1>
          
          <p className="text-gray-600 mb-8">
            Here you will find answers to some of the more frequently asked questions about our online calculators and converters.
          </p>

          <div className="space-y-8">
            {/* FAQ Item 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Are all your calculators free?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we are committed to providing this service for free. You can use all our online calculators, converters, and random generators to your heart&apos;s desire, within reasonable limit.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How can I embed a calculator / converter / randomizer on my site or blog?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Most of our tools are available to be embedded in other sites. Just look for a &quot;Put it on your site!&quot; box near the results of your calculation. The instructions are very straightforward and require minimum technical expertise. There are some customization options available, but currently our calculators are only available in English.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What are the sources for the formulas used?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The formulas are from textbooks, scientific papers, and other authoritative material. Many calculators would have a reference list, pointing to the specific material used. When there is controversy on which is the correct formula, we do our best to explain the choice of formula, and if possible - provide results for each viable equation.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How to cite base64toolsonine.com?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                It is easy to cite our site. If you are writing an academic paper, thesis, or even just a course-work/report, the way to cite any of our calculators and information on our calculator pages is displayed near the footer on each page. Just scroll down and look for a &quot;Cite this calculator & page&quot; or &quot;Cite this converter & page&quot; box.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How to report issues or errors?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Despite our best effort some calculators might not function as expected or might produce strange results in boundary cases. If you spot what you believe is an error or a visual bug in our tools, please, contact us and make sure you provide a detailed explanation of the issue.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                I need a consultation regarding a particular issue
              </h3>
              <p className="text-gray-600 leading-relaxed">
                While we do offer many free tools which can help you solve a range of everyday tasks such as converting a recipe from one metric to another or one serving size to another or calculating the number of tiles you&apos;d need to cover your bathroom floor, as well as a number of highly complex and specialized tasks such as calculating a hazard ratio statistic for the outcome of a clinical trial we do not offer consultations on any of these issues.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                If you need help in deciding on the input or in interpreting the results from our calculators, consulting the text below each tool is a good starting point, but in some cases you might ultimately need to enlist the services of a professional consultant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 