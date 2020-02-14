# This generator implements the glossary tag (<glossary>)

require 'nokogumbo'

module Jekyll
  class GlossaryTag
    class << self
      ###
      # Replace '<glossary id='xxx'>...</glossary>' tags in document's HTML output with
      # likns to individual glossary items.
      def process(content)
        # Pull out information about our Jekyll site.
        site = content.site

        # Glossary items from the YAML file in _data/glossary.yaml.
        glossary = site.data['glossary']

        # Prepare the template for referencing glossary items.
        template_path = File.join(site.source, '_includes', 'glossary.html')
        template = Liquid::Template.parse(File.read(template_path))

        # Make sure the settings for rendering the template are the same as across
        # the whole site.
        liquid_options = site.config['liquid']
        template_info = {
          :registers        => { :site => site, :page => content },
          :strict_filters   => liquid_options['strict_filters'],
          :strict_variables => liquid_options['strict_variables'],
        }

        # Parse the document as HTML5.
        doc = Nokogiri.HTML5(content.output)

        # Go through each of the glossary references and replace with the rendered
        # template.
        doc.search('glossary').each do |element|
          id = element['id']
          # Require that each reference specify the ID of the referenced item.
          if id.nil?
            Jekyll.logger.error "Glossary reference in #{content.relative_path} has no id attribute"
            exit 1
          end

          # Require that the tag has contents, i.e. disallow <glossary id="xxx" />
          if element.children.empty?
            Jekyll.logger.error "Glossary tag cannot be empty in #{content.relative_path}"
            exit 1
          end

          # Find the corresponding item.
          item = glossary.find { |it| it['id'] == id }
          if item.nil?
            Jekyll.logger.error "Referenced item with id #{id} does not exist in glossary"
            exit 1
          end

          # Render the template and replace the original element with it.
          new_element = template.render!({ 'item' => item, 'inner' => element.inner_html }, template_info)
          element.replace new_element
        end

        content.output = doc.to_html
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  Jekyll.logger.info "                  * Replacing glossary tags ..."

  site.documents.each do |doc|
    Jekyll::GlossaryTag.process(doc)
  end
end
